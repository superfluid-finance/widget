workspace "Superfluid Checkout System" {
    !adrs decisions

    model {
        CheckoutCustomerSystem = softwareSystem "Checkout Customer System" {
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

                    -> CheckoutWidgetForm "Input of"
                }

                CheckoutWidgetProductTokenList = component "Token List" {
                    description "The display info for the tokens that are set up as payment options."

                    -> CheckoutWidgetForm "Input of"
                }
            }



            // CheckoutContainer = container "Checkout Container" "The website that holds the checkout widget(s)." {
            //     -> CheckoutStore "Gets details from"
            //     -> CheckoutWidget "Uses"
            // }




            // CheckoutMerchantDashboard = container "Merchant Dashboard" "The UI to see subscriptions and products from" {
            //     -> CheckoutStore "CRUD"
            // }
        }

        CheckoutStorageSystem = softwareSystem "Checkout Storage System" {
            CheckoutStorageAPI = container "Checkout Storage API" {
                description "Something to hold the checkout inputs."

            }

            CheckoutIPFS = container "Checkout IPFS" {
                description "Decentralized storage."

            }
        }

        CheckoutMerchantSystem = softwareSystem "Checkout Merchant System" {
            CheckoutBuilder = container "Checkout Builder" {
                description "The service that builds the input for the widget."

                -> CheckoutStorageSystem "Gets details from"
            }
        }        

        Wallet = softwareSystem "Web3 Wallet" "Wallet" {
            description "The user's wallet with RPC & signature access."
            tags "Wallet"

            // -> CheckoutWidgetForm "Goes into"
        }

        SuperfluidUserSystem = softwareSystem "Superfluid User System" {
            tags "Superfluid Finance"

            SuperfluidDashboard = container "Superfluid Dashboard" {
                description "The UI to see token balances and flows."
                tags "Web App"

                -> CheckoutWidget "Can contain a generic 'hosted' version"
            }

            SuperfluidConsole = container "Superfluid Console" {
                description "The UI view Superfluid Protocol from bird's eye view."
                tags "Web App"
            }
        }

        Web3MerchantEcosystem = softwareSystem "Web3 Stores" {
            tags "External"

            -> CheckoutWidget "The website that holds the checkout widget(s)."
        }

        Web3Merchant = person "Web3 Merchant"
        Web3Merchant -> CheckoutMerchantSystem "Uses"

        Web3User = person "Web3 User"
        // Web3User -> Wallet "Uses"
        Web3User -> SuperfluidDashboard "Uses to manage token balances"
        Web3User -> Web3MerchantEcosystem "Goes to subscribe to a product"
        Web3User -> CheckoutWidget "Uses to make payment"
    }

    views {
        systemlandscape TheBigPicture "The Checkout Big Picture" {
            include *
            autoLayout
        }

        container CheckoutCustomerSystem "CheckoutCustomerSystem" {
            include *
            autoLayout
        }

        container CheckoutStorageSystem "CheckoutStorageSystem" {
            include *
            autoLayout
        }

        container SuperfluidUserSystem "SuperfluidUserSystem" {
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
