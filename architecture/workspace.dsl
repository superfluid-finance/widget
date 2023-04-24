// This architecture is described in Structurizr DSL and follows the C4 model.
workspace "Superfluid Checkout System" {
    !adrs decisions

    model {
        SuperfluidTokenGating = softwareSystem "Superfluid Token Gating" {
            tags "Future"

            AccessTokenServer = container "Access Token Server" {
                tags "OAuth"
            }
        }

        CheckoutWidgetSystem = softwareSystem "Checkout Widget System" {
            description "The main customer facing part of the Checkout system."
            tags "superfluid-checkout, In Development"

            CheckoutWidget = container "Checkout Widget" {
                description "Provides a streamlined UX to subscribe to the given product."
                technology "TypeScript, React, MUI, wagmi, Zod, Token List"
                tags "In Development, superfluid-checkout"

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
            }

            group "Checkout Input Details" {
                CheckoutProductInfo = container "Product Info" {
                    description "Product details, including payment options (token & network & flow rate)"
                    technology "Schema-validated JSON"

                    -> CheckoutWidgetForm "Input of"
                }

                CheckoutProductTokenList = container "Token List" {
                    description "The display info for the tokens that are set up as payment options."
                    technology "Schema-validated JSON, Uniswap's Token List standard"

                    -> CheckoutWidgetForm "Input of"
                }
            }


            CheckoutBuilder = container "Checkout Builder" {
                description "The easy to use GUI for setting up a checkout."
                tags "Web App, superfluid-checkout, In Development"

                -> CheckoutProductInfo "Produces"
                -> CheckoutProductTokenList "Produces (or denormalizes)"
            }

            CheckoutLinkCreator = container "Checkout Link Creator" {
                description "The easy to use GUI for creating a checkout link."
                tags "Web App, superfluid-checkout, In Development"
            }
        }

        CheckoutStorageSystem = softwareSystem "Checkout Storage System" {
            tags "superfluid-checkout, Future"

            CheckoutStorageAPI = container "Checkout Storage API" {
                description "An API to store and retrieve checkout configurations (product info & payment options)."
                tags "superfluid-checkout"
            }

            CheckoutIPFS = container "Checkout IPFS" {
                description "Decentralized storage."
            }
        }

        SuperfluidNotificationSystem = softwareSystem "Superfluid Notification System" {
            tags "Future"

            description "The system that sends notifications to both the users and other systems."

            NotificationEventStream = container "Notification Event Stream" {
                description "A stream of events that other systems can subscribe to."
                technology "Amazon SNS, Webhooks"
                tags "Future"
            }
        }

        CheckoutMerchantSystem = softwareSystem "Checkout Merchant System" {
            tags "superfluid-checkout, In Development"

            CheckoutMerchantDashboard = container "Checkout Merchant Dashboard" {
                description "The one aggregating interface everything a merchant could need."
                tags "Web App, superfluid-checkout"
            }

            HostableCheckoutStorage = container "Self-hostable Checkout Storage" {
                description "A self-hostable centralized storage mechanism. Can hold personal information if properly communicated."
                tags "Database, superfluid-checkout"
            }
        }

        SuperfluidUserProducts = softwareSystem "Superfluid User Products" {
            description "The main end-user facing suite of products for anything Superfluid Protocol related."
            tags "Superfluid Finance"

            SuperfluidDashboard = container "Superfluid Dashboard" {
                description "The web app to see token balances and streams. "
                technology "TypeScript, Next.js (SSG), React, MUI, SDK-core, SDK-redux, Redux Toolkit (RTK), wagmi, RainbowKit, react-hook-form"
                tags "Web App, Superfluid Finance"

                -> CheckoutWidget "Might 'host' a decentralized version"

                Vesting = component "Superfluid Vesting UI"
                Accounting = component "Superfluid Accounting UI"
                AddressBook = component "Superfluid Address Book UI"
                AutoWrapManager = component "Superfluid Auto-Wrap Manager UI" {
                    tags "Coming Soon"
                }
                Bridge = component "Super Token Bridge UI" {
                    technology "Li.Fi widget"
                }
                Notifications = component "Superfluid Notifications UI" {
                    technology "Push Protocol"
                }
            }

            SuperfluidConsole = container "Superfluid Console" {
                description "The UI to view Superfluid Protocol from bird's eye view. Directed at developers."
                technology "TypeScript, Next.js (SSR), React, MUI, SDK-core, SDK-redux"
                tags "Web App, Superfluid Finance"
            }

            SuperfluidWebsite = container "Superfluid Website" {
                description "The main website for introducing Superfluid Protocol. Mostly static marketing content."
                technology "TypeScript, Next.js (SSR), React, MDX, gsap (animations), Strapi"
                tags "Website, Superfluid Finance"
            }
        }

        Wallet = softwareSystem "Web3 Wallet" {
            description "The user's wallet with RPC & signature access."
            tags "Wallet"
        }

        Web3MerchantEcosystem = softwareSystem "Web3 Merchant Ecosystem" {
            description "Stores & Games & Subscription Services & etc"
            tags "External"

            -> CheckoutWidget "The website that hosts the checkout widget."
        }

        group "Payment Receivers" {
            ContentCreator = person "Content Creator" {
                description "Accepting Web3 donations"

                -> CheckoutWidget "Uses"
            }

            Web2Merchant = person "Web2 Merchant" {
                description "Selling subscriptions and accepting Web3 payments."

                -> CheckoutMerchantSystem "Uses"
            }

            Web3NativeMerchant = person "Web3 Native Merchant" {
                description "Accepting Web3 payments and deeply integrating on the blockchain level."

                -> CheckoutMerchantSystem "Uses"
            }
        }

        group "Payment Senders" {
            Web3Consumer = person "Web3 Consumer" {
                -> SuperfluidDashboard "Uses to view balances & manage Superfluid things"
                -> Web3MerchantEcosystem "Wants to buy something from"
                -> CheckoutWidget "Uses to make payment with"
            }
        }
    }

    views {
        systemlandscape TheBigPicture "The Checkout Big Picture" {
            include *
            autoLayout
        }

        container SuperfluidUserProducts "SuperfluidUserProducts" {
            include *
            autoLayout
        }

        container CheckoutWidgetSystem "CheckoutWidgetSystem" {
            include *
            autoLayout
        }

        container CheckoutMerchantSystem "CheckoutMerchantSystem" {
            include *
            autoLayout
        }

        container CheckoutStorageSystem "CheckoutStorageSystem" {
            include *
            autoLayout
        }

        component CheckoutWidget "CheckoutWidgetComponents" {
            include *
            autoLayout
        }

        styles {
            element "Element" {
                shape RoundedBox
            }

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

            element "Website" {
                shape WebBrowser
            }

            element "Superfluid Finance" {
                background #00991f
                color #ffffff
            }

            element "superfluid-checkout" {
                background #3B75A9
                color #ffffff
            }

            element "Command" {
                background #3399fe
                color #ffffff
            }

            element "Future" {
                opacity 50
            }

            element "In Development" {
                stroke #f8c806
                strokeWidth 10
            }
        }
    }
}
