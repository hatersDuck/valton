package main

import (
	"log"

	tonparse "github.com/hatersDuck/Valt-TP/pkg/ton-parse"
)

const connect_ton_url string = "https://ton.org/global.config.json"

func main() {

	client, err := tonparse.Create_Client(connect_ton_url)
	if err != nil {
		log.Fatal(err)
	}

	client.Parce_nft_from_address("EQAKcpIMlHcWovpS6VuKYalGieO0rP_YRyY2YNXW6lW4sJrO")
}
