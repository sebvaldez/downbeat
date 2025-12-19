package main

import (
	"downbeat/internal/db"
	"embed"
	"log"

	"github.com/joho/godotenv"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// load env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env found, using defaults")
	}

	// Open database connection
	database, err := db.Open()
	if err != nil {
		log.Fatalf("Database connection error: %v", err)
	}
	defer database.Close()

	// Run migrations
	if err := db.RunMigrations(database); err != nil {
		log.Fatalf("Error running migrations: %v", err)
	}

	// seed database
	if err := db.Seed(database); err != nil {
		log.Fatalf("Error seeding database: %v", err)
	}

	// Create an instance of the app structure
	app := NewApp(database)

	// Create application with options
	err = wails.Run(&options.App{
		Title:  "downbeat",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		OnShutdown:       app.shutdown,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
