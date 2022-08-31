package main

import (
	"context"
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"server/models"
	"time"

	_ "github.com/lib/pq"
)

const version = "1.0.0"

type config struct {
	port int
	env  string
	db   struct {
		dsn      string
		host     string
		port     string
		dbname   string
		password string
		username string
		schema   string
		table    string
	}
}

type AppStatus struct {
	Status      string `json:"status"`
	Environment string `json:"environment"`
	Version     string `json:"version"`
}

type jsonRes struct {
	OK bool `json:"ok"`
}

type application struct {
	config config
	logger *log.Logger
	models models.Models
}

// const (
// 	host     = "localhost"
// 	port     = 5432
// 	user     = "postgres"
// 	password = "root"
// 	dbname   = "id_goreactmovie"
// )

func main() {
	var cfg config

	flag.IntVar(&cfg.port, "port", 4000, "Server port Listened on")
	flag.StringVar(&cfg.env, "env", "development", "Application environment(Development)")
	//dflag.StringVar(&cfg.db.dsn, "dsn", "postgres://postgres@localhost/goreactmovie?sslmode=disable", "Postgres Connection config")
	flag.StringVar(&cfg.db.host, "db-host", "localhost", "the host of the database")
	flag.StringVar(&cfg.db.port, "db-port", "5432", "the port of the databse")
	flag.StringVar(&cfg.db.username, "db-username", "postgres", "The username associated with the Postgres instance")
	flag.StringVar(&cfg.db.password, "db-password", "root", "The password of the db user account")
	flag.StringVar(&cfg.db.dbname, "db-database", "gomoviereact", "The database name")
	// flag.StringVar(&cfg.db.password, "pg-database", "id_goreactmovie", "The PostgreSQL database")
	// flag.StringVar(&cfg.db.schema, "pg-schema", "public", "The PostgreSQL schema")
	flag.Parse()

	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	db, err := openDB(cfg)
	if err != nil {
		logger.Fatal(err)
	}
	defer db.Close()

	app := &application{
		config: cfg,
		logger: logger,
		models: models.NewModels(db),
	}

	fmt.Println("Server is running on localhost:", cfg.port)

	serve := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.port),
		Handler:      app.routes(),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	logger.Print("Starting server on port ", cfg.port)

	err = serve.ListenAndServe()
	if err != nil {
		log.Println(err)
	}
}

func openDB(cfg config) (*sql.DB, error) {
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		cfg.db.host, cfg.db.port, cfg.db.username, cfg.db.password, cfg.db.dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	return db, nil
}
