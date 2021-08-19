---
title: "FullNodes"
slug: "basics-fullnodes"
hidden: false
---
A Diem node is a peer entity of the Diem ecosystem that tracks the <Glossary>state</Glossary> of the Diem Blockchain. Clients interact with the blockchain via Diem nodes. There are two types of nodes:
* <a href="doc:basics-validator-nodes" target="_blank">Validator nodes</a>
* FullNodes

Each Diem node comprises several logical components:
* <Glossary>JSON-RPC service</Glossary> (disabled in validator nodes)
* <a href="doc:basics-validator-nodes#mempool" target="_blank">Mempool</a>
* <a href="doc:basics-validator-nodes#consensus" target="_blank">Consensus</a>
* <a href="doc:basics-validator-nodes#execution" target="_blank">Execution</a>
* <a href="doc:basics-validator-nodes#virtual-machine" target="_blank">Virtual Machine</a>
* <a href="doc:basics-validator-nodes#storage" target="_blank">Storage</a>
* <a href="doc:basics-validator-nodes#state-synchronizer" target="_blank">State synchronizer</a>

The <Glossary>Diem Core</Glossary> software can be configured to run as a validator node or as a FullNode.

## Introduction

FullNodes can be run by anyone who wants to verify the state of the Diem Blockchain and synchronize to it. FullNodes replicate the full state of the blockchain by querying each other or by querying the validator nodes directly.  They can also accept transactions submitted by Diem clients and forward them to validator nodes.

Additionally, FullNodes are an external validation resource for finalized transaction history. They receive transactions from upstream nodes and then re-execute them locally (the same way a validator node executes transactions). FullNodes store the results of the re-execution to local storage. In doing so, they will notice and can provide evidence if there is any attempt to rewrite history. This helps to ensure that the validator nodes are not colluding on arbitrary transaction execution.
 
## Public FullNodes
A public FullNode uses the same software as a validator node and connects directly to one or more validator nodes to submit transactions and synchronize to the <Glossary>state</Glossary> of the Diem Blockchain. 

A public FullNode has all Diem node components, with the consensus component being disabled. 

Third-party blockchain explorers, wallets, exchanges, and DApps may run a local FullNode to:
* Leverage the JSON-RPC protocol for richer blockchain interactions.
* Get a consistent view of the Diem Payment Network.
* Avoid rate limitations on read traffic.
* Run custom analytics on historical data.
* Get notifications about particular on-chain events.