# resource "azurerm_managed_grafana" "example" {
#   name                = "example-managedgrafana"
#   location            = azurerm_resource_group.rg.location
#   resource_group_name = azurerm_resource_group.rg.name
#   sku_name            = "Gen1_Standard"

#   custom_domain_name_enabled = false

#   identity {
#     type = "SystemAssigned"
#   }

#   storage_account {
#     name = "mystorageaccount"
#     key  = "mykey"
#   }

#   authentication {
#     type        = "AzureAD"
#     client_id   = "azuread-application-client-id"
#     client_secret {
#       name    = "client-secret-name"
#       version = "client-secret-version"
#     }
#     tenant_id = var.ARM_TENANT_ID
#   }
  
#   lifecycle {
#     ignore_changes = [identity[0].principal_id, identity[0].tenant_id]
#   }
# }

# output "grafana_url" {
#   value       = azurerm_managed_grafana.example.data_source_grafana_url
#   description = "The URL to access the Grafana instance"
# }
