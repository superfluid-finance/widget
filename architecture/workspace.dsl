workspace {
    !adrs decisions

    model {

        Checkout = softwareSystem "Superfluid Checkout" {
            CheckoutStore = container "Checkout Storage API" "Something to hold the checkout inputs." {

            }

            CheckoutWidget = container "Checkout Widget V1" "Provides a streamlined UX to subscribe to the given product." "TypeScript, React, MUI, wagmi, Zod, Token List" {
                group "On-Chain Transactions" {
                    AuthorizeAutoWrapTx = component "Authorize Auto-Wrap"
                    EnableAutoWrapTx = component "Enable Auto-Wrap"
                    AuthorizeSuperTokenTx = component "Authorize Superfluid to Wrap Tokens"
                    WrapIntoSuperTokenTx = component "Upgrade to Super Token"
                    CreateFlowTx = component "Create Flow"
                }

                group "Commands" {
                    CheckoutAutoWrapCommand = component "Enable Auto-Wrap Command" {
                        -> AuthorizeAutoWrapTx "Produces"
                        -> EnableAutoWrapTx "Produces"
                    }
                    CheckoutWrapIntoSuperTokensCommand = component "Wrap Super Tokens Command" {
                        -> AuthorizeSuperTokenTx "Produces"
                        -> WrapIntoSuperTokenTx "Produces"
                    }
                    CheckoutSubscribeCommand = component "Subscribe Command" {
                        -> CreateFlowTx "Produces"
                    }
                }

                CheckoutWidgetForm = component "Checkout Form" "The form with inputs that the user fills out." "wagmi, react-hook-form, Zod" {
                    -> CheckoutAutoWrapCommand "Produces"
                    -> CheckoutWrapIntoSuperTokensCommand "Produces"
                    -> CheckoutSubscribeCommand "Produces"
                }

                CheckoutWidgetProduct = component "Product Info" "Product details, including payment options (token & network & flow rate)" {
                    -> CheckoutWidgetForm "Input of"
                }

                CheckoutWidgetProductTokenList = component "Token List" "The display info for the tokens that are set up as payment options." {
                    -> CheckoutWidgetForm "Input of"
                }
            }

            CheckoutContainer = container "Checkout Container" "The website that holds the checkout widget(s)." {
                -> CheckoutStore "Gets details from"
                -> CheckoutWidget "Uses"
            }

            CheckoutMerchantDashboard = container "Merchant Dashboard" "The UI to configure" {
                -> CheckoutStore "CRUD"
            }
        }

        Wallet = softwareSystem "Web3 Wallet" "The user's wallet with RPC & signature access." {
            // -> CheckoutWidgetForm "Goes into"
        }


        Dashboard = softwareSystem "Superfluid Dashboard" {
        }

        Vesting = softwareSystem "Superfluid Vesting" {
        }

        Web3Store = softwareSystem "Web3 Store"
        Web3Store -> Checkout "Uses" 

        Web3Merchant = person "Web3 Merchant"
        Web3Merchant -> CheckoutMerchantDashboard "Uses"

        Web3User = person "Web3 User"
        Web3User -> Wallet "Uses"
        Web3User -> Dashboard "Goes to"
        Web3User -> Web3Store "Goes to"
        Web3User -> CheckoutWidget "Uses"
    }

    views {
        systemlandscape "SystemLandscape" {
            include *
            autoLayout
        }

        systemContext Checkout "Diagram1" {
            include *
            autoLayout
        }

        container Checkout "Diagram2" {
            include *
            autoLayout
        }

        component CheckoutWidget "Diagram3" {
            include *
            autoLayout
        }
    }
}
