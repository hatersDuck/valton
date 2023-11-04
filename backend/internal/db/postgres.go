package db

import (
	"context"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func CreatePostgresConnection() (*pgxpool.Pool, error) {
	dbpool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	return dbpool, err
}
