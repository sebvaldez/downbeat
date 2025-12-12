.PHONY: dev clean-builds migrate-create migrate-up migrate-down migrate-status

# Start development environment
dev:
	wails dev

# clean up builds
clean-builds:
	rm -rf build/

# Create a new migration
MIGRATION_DIR := ./internal/db/migrations
SQLITE_DB_PATH := $(shell pwd)/local.db
migrate-create:
	@read -p "Enter migration name: " name; \
	goose -dir ${MIGRATION_DIR} create $$name sql
# Run migrations not yet applied
migrate-up:
	goose -dir ${MIGRATION_DIR} sqlite3 ${SQLITE_DB_PATH} up
# Rollback the last applied migration
migrate-down:
	goose -dir ${MIGRATION_DIR} sqlite3 ${SQLITE_DB_PATH} down

# Check migration status
migrate-status:
	goose -dir ${MIGRATION_DIR} sqlite3 ${SQLITE_DB_PATH} status