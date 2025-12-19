package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"path/filepath"

	_ "github.com/tursodatabase/go-libsql"
)

// Open creates and returns a database connection
// Supports both local-only mode and Turso embedded replica mode
func Open() (*sql.DB, error) {
	dbPath, err := getDatabasePath()
	if err != nil {
		return nil, fmt.Errorf("get database path: %w", err)
	}

	db, err := openDatabase(dbPath)
	if err != nil {
		return nil, fmt.Errorf("open database: %w", err)
	}

	// Test connection
	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("ping database: %w", err)
	}

	log.Println("✓ Database connection successful")
	return db, nil
}

// getDatabasePath returns the path for the local database file
func getDatabasePath() (string, error) {
	// Check if we have Turso credentials
	tursoURL := os.Getenv("TURSO_DATABASE_URL")
	tursoToken := os.Getenv("TURSO_AUTH_TOKEN")

	// Get user home directory
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return "", fmt.Errorf("get home directory: %w", err)
	}

	// Create .downbeat directory if it doesn't exist
	appDir := filepath.Join(homeDir, ".downbeat")
	if err := os.MkdirAll(appDir, 0755); err != nil {
		return "", fmt.Errorf("create app directory: %w", err)
	}

	dbPath := filepath.Join(appDir, "downbeat.db")

	// Log configuration
	if tursoURL != "" && tursoToken != "" {
		log.Println("✓ Turso credentials found - will use embedded replica with sync")
		log.Printf("  Turso URL: %s", tursoURL)
		log.Printf("  Local DB: %s", dbPath)
	} else {
		log.Println("✓ Using local-only SQLite database")
		log.Printf("  Local DB: %s", dbPath)
	}

	return dbPath, nil
}

// openDatabase opens a connection to the database (local or Turso embedded replica)
func openDatabase(localDBPath string) (*sql.DB, error) {
	tursoURL := os.Getenv("TURSO_DATABASE_URL")
	tursoToken := os.Getenv("TURSO_AUTH_TOKEN")

	var dsn string

	if tursoURL != "" && tursoToken != "" {
		// Turso embedded replica mode
		// Format: file:path/to/local.db?sync_url=https://...&auth_token=xxx
		dsn = fmt.Sprintf("file:%s?sync_url=%s&auth_token=%s",
			localDBPath,
			tursoURL,
			tursoToken,
		)
		log.Println("Opening database in Turso embedded replica mode...")
	} else {
		// Local-only mode
		// Format: file:path/to/local.db
		dsn = fmt.Sprintf("file:%s", localDBPath)
		log.Println("Opening database in local-only mode...")
	}

	database, err := sql.Open("libsql", dsn)
	if err != nil {
		return nil, fmt.Errorf("open database: %w", err)
	}

	return database, nil
}
