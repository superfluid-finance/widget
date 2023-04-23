// This architecture is described in Structurizr DSL and follows the C4 model.
workspace "Superfluid Checkout System" {
    !adrs decisions

    model {
        CheckoutConsumerSystem = softwareSystem "Checkout Consumer System" {
            CheckoutWidget = container "Checkout Widget V1" {
                description "Provides a streamlined UX to subscribe to the given product."
                technology "TypeScript, React, MUI, wagmi, Zod, Token List"

                group "On-Chain Transactions" {
                    AuthorizeAutoWrapTx = component "Authorize Auto-Wrap"
                    EnableAutoWrapTx = component "Enable Auto-Wrap"
                    AuthorizeSuperTokenTx = component "Authorize Superfluid to Wrap Tokens"
                    WrapIntoSuperTokenTx = component "Upgrade to Super Token"
                    CreateFlowTx = component "Create Flow"
                }

                group "Commands" {
                    CheckoutAutoWrapCommand = component "Enable Auto-Wrap Command" {
                        tags "Command"

                        -> AuthorizeAutoWrapTx "Produces"
                        -> EnableAutoWrapTx "Produces"
                    }
                    CheckoutWrapIntoSuperTokensCommand = component "Wrap Super Tokens Command" {
                        tags "Command"

                        -> AuthorizeSuperTokenTx "Produces"
                        -> WrapIntoSuperTokenTx "Produces"
                    }
                    CheckoutSubscribeCommand = component "Subscribe Command" {
                        tags "Command"

                        -> CreateFlowTx "Produces"
                    }
                }

                CheckoutWidgetForm = component "Checkout Form" {
                    description "The form with inputs that the user fills out."
                    technology "wagmi, react-hook-form, Zod"
                    
                    -> CheckoutAutoWrapCommand "Produces"
                    -> CheckoutWrapIntoSuperTokensCommand "Produces"
                    -> CheckoutSubscribeCommand "Produces"
                }

                CheckoutWidgetProduct = component "Product Info" {
                    description "Product details, including payment options (token & network & flow rate)"
                    technology "JSON"

                    -> CheckoutWidgetForm "Input of"
                }

                CheckoutWidgetProductTokenList = component "Token List" {
                    description "The display info for the tokens that are set up as payment options."
                    technology "JSON, Uniswap's Token List standard"

                    -> CheckoutWidgetForm "Input of"
                }
            }
        }

        CheckoutStorageSystem = softwareSystem "Checkout Storage System" {
            CheckoutStorageAPI = container "Checkout Storage API" {
                description "An API to store and retrieve checkout configurations (product info & payment options)."
            }

            CheckoutIPFS = container "Checkout IPFS" {
                description "Decentralized storage."
            }
        }

        CheckoutMerchantSystem = softwareSystem "Checkout Merchant System" {
            CheckoutBuilder = container "Checkout Builder" {
                description "The easy to use GUI for setting up a checkout."

                -> CheckoutStorageSystem "Gets details from"
            }
        }

        SuperfluidUserProducts = softwareSystem "Superfluid User Products" {
            tags "Superfluid Finance"

            SuperfluidDashboard = container "Superfluid Dashboard" {
                description "The UI to see token balances and flows."
                tags "Web App"
                technology "TypeScript, Next.js, React, MUI, SDK-core, SDK-redux, Redux Toolkit (RTK), wagmi"

                -> CheckoutWidget "Can contain a generic 'hosted' version"
            }

            SuperfluidConsole = container "Superfluid Console" {
                description "The UI view Superfluid Protocol from bird's eye view."
                technology "TypeScript, Next.js, React, MUI, SDK-core, SDK-redux"
                tags "Web App"
            }
        }

        Wallet = softwareSystem "Web3 Wallet" "Wallet" {
            description "The user's wallet with RPC & signature access."
            tags "Wallet"
        }

        Web3MerchantEcosystem = softwareSystem "Web3 Stores" {
            tags "External"

            -> CheckoutWidget "The website that holds the checkout widget(s)."
        }

        Web3Merchant = person "Web3 Merchant"
        Web3Merchant -> CheckoutMerchantSystem "Uses"

        Web3Consumer = person "Web3 Consumer"
        Web3Consumer -> SuperfluidDashboard "Uses to manage token balances"
        Web3Consumer -> Web3MerchantEcosystem "Goes to subscribe to a product"
        Web3Consumer -> CheckoutWidget "Uses to make payment"
    }

    views {
        systemlandscape TheBigPicture "The Checkout Big Picture" {
            include *
            autoLayout
        }

        container CheckoutConsumerSystem "CheckoutConsumerSystem" {
            include *
            autoLayout
        }

        container CheckoutStorageSystem "CheckoutStorageSystem" {
            include *
            autoLayout
        }

        container SuperfluidUserProducts "SuperfluidUserProducts" {
            include *
            autoLayout
        }
        
        component CheckoutWidget "CheckoutWidgetComponents" {
            include *
            autoLayout
        }

        styles {
            element "Person" {
                shape person
                background #976440
                color #ffffff
            }

            element "Wallet" {
                shape MobileDevicePortrait
                background #f6851b
            }

            element "Web App" {
                shape WebBrowser
            }

            element "Superfluid Finance" {
                background #1db227
                color #ffffff
            }

            element "Command" {
                background #3399fe
                color #ffffff
            }
        }
    }
}
