//const Core = require('./core');
const {categoryBoilerplate, category, getReference, standaloneLink} = require("./../components");

// const TechnicalPapers = require('./technical-papers');
// const Home = require('./home');
// const MerchantSolutions = require('./merchant-solutions');
// const Move = require('./move');
// const NodeOperators = require('./node-operators');
// const Tutorials = require('./tutorials');
// const WalletApp = require('./wallet-app');

const prefix = "readme.com/";

function collapsibleCategory(label, items) {
  let cat = category(label, items);
  cat.collapsible = true;
  cat.collapsed = true;
  return cat;
}

const ReadmeComRoot = [
  ...categoryBoilerplate(`${prefix}welcome-to-diem`, 'core-contributors'),

  category('Basics', [
    `${prefix}Basics/basics-txns-states`,
    `${prefix}Basics/basics-validator-nodes`,
    `${prefix}Basics/basics-fullnodes`,
    `${prefix}Basics/basics-accounts`,
    `${prefix}Basics/basics-gas-txn-fee`,
    `${prefix}Basics/basics-events`,
    `${prefix}Basics/basics-node-networks-sync`,
  ]),

  category('Transactions', [
    `${prefix}Transactions/basics-life-of-txn`,
    collapsibleCategory('Types of Transactions', [
      `${prefix}Transactions/txns-types`,
      `${prefix}Transactions/txns-types/txns-create-accounts-mint`,
      `${prefix}Transactions/txns-types/txns-manage-accounts`,
      `${prefix}Transactions/txns-types/txns-send-payment`,
    ]),
  ]),

  category('Wallets and Merchant Stores', [
    `${prefix}Wallets and Merchant Stores/integrate-wallet-merchant-dpn`,

    category('Diem Reference Wallet', [
      `${prefix}Wallets and Merchant Stores/diem-reference-wallet`,
      `${prefix}Wallets and Merchant Stores/diem-reference-wallet/reference-wallet-admin-dash`,
      `${prefix}Wallets and Merchant Stores/diem-reference-wallet/reference-wallet-local-mob`,
      `${prefix}Wallets and Merchant Stores/diem-reference-wallet/reference-wallet-local-web`,
      `${prefix}Wallets and Merchant Stores/diem-reference-wallet/reference-wallet-public-demo`,
      `${prefix}Wallets and Merchant Stores/diem-reference-wallet/reference-wallet-set-up-modules`,
    ]),

    category('Diem Reference Merchant Store', [
      `${prefix}Wallets and Merchant Stores/diem-reference-merchant-store`,
      `${prefix}Wallets and Merchant Stores/diem-reference-merchant-store/local-web-reference-merchant`,
      `${prefix}Wallets and Merchant Stores/diem-reference-merchant-store/reference-merchant-manage-payments`,
      `${prefix}Wallets and Merchant Stores/diem-reference-merchant-store/reference-merchant-public-demo`,
      `${prefix}Wallets and Merchant Stores/diem-reference-merchant-store/reference-merchant-set-up-modules`,
    ]),

    `${prefix}Wallets and Merchant Stores/try-our-mini-wallet`,
  ]),

  category('Tutorials', [
    `${prefix}Tutorials/tutorial-my-first-transaction`,
    `${prefix}Tutorials/tutorial-query-the-blockchain`,
    `${prefix}Tutorials/configure-run-public-fullnode`,
    `${prefix}Tutorials/tutorial-run-local-validator-nw`,
    `${prefix}Tutorials/tutorial-my-first-client`,
  ]),

  category('Tools', [
    `${prefix}Tools/sdks`,
    standaloneLink("https://github.com/libra/libra/blob/master/json-rpc/json-rpc-spec.md", "JSON-RPC API"),
    `${prefix}Tools/cli-reference`,
    `${prefix}Tools/github-projects`,
  ]),

  category('Reference', [
    `${prefix}Reference/reference-rust-docs`,
    `${prefix}Reference/security`,
  ]),

  category('Technical Papers', [
    `${prefix}Technical Papers/technical-papers-overview`,
    `${prefix}Technical Papers/move-paper`,
    `${prefix}Technical Papers/the-diem-blockchain-paper`,
    `${prefix}Technical Papers/state-machine-replication-paper`,
    `${prefix}Technical Papers/jellyfish-merkle-tree-paper`,
    `${prefix}Technical Papers/publication-archive`,
  ]),

  category('Policies', [
    `${prefix}Policies/terms-of-use`,
    `${prefix}Policies/code-of-conduct`,
    `${prefix}Policies/cookies`,
    `${prefix}Policies/coding-guidelines`,
    `${prefix}Policies/contributing`,
    `${prefix}Policies/privacy-policy`,
    `${prefix}Policies/maintainers`,
  ]),

];


module.exports = {
  ReadmeComRoot
  //Core,
  // TechnicalPapers,
  // Home,
  // MerchantSolutions,
  // Move,
  // NodeOperators,
  // Tutorials,
  // WalletApp,
};