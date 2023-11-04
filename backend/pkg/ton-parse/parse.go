package tonparse

import (
	"context"

	"github.com/xssnick/tonutils-go/liteclient"
	"github.com/xssnick/tonutils-go/tlb"
	"github.com/xssnick/tonutils-go/ton"
)

const api_key = "2fceaf90ba1109d340d616b5421a7b66dba8d183c137d713e74050f260a26008"

type Client struct {
	ConfigURL string
	conn      *liteclient.ConnectionPool
	api       *ton.APIClient
}

func Create_Client(configURL string) (*Client, error) {
	cl := &Client{
		ConfigURL: configURL,
	}
	cl.conn = liteclient.NewConnectionPool()
	err := cl.conn.AddConnectionsFromConfigUrl(context.Background(), configURL)
	if err != nil {
		return nil, err
	}
	cl.api = ton.NewAPIClient(cl.conn)

	return cl, nil
}

// limit = 0 is inf
func (c *Client) parce_transaction(limit int, address_contract string) ([]*tlb.Transaction, error) {

	return nil, nil
}
