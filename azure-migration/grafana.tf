resource "azurerm_managed_grafana" "example" {
  name                = "example-managedgrafana"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku_name            = "Gen1_Standard"
  custom_domain_name_enabled = false

  identity {
    type = "SystemAssigned"
  }

  storage_account {
    name = azurerm_storage_account.grafana_storage.name
    key  = azurerm_storage_account.grafana_storage.primary_access_key
  }

  authentication {
    type        = "AzureAD"
    client_id   = "azuread-application-client-id"
    client_secret {
      name    = "client-secret-name"
      version = "client-secret-version"
    }
    tenant_id = var.ARM_TENANT_ID
  }
  
  lifecycle {
    ignore_changes = [identity[0].principal_id, identity[0].tenant_id]
  }
}

output "grafana_url" {
  value       = azurerm_managed_grafana.example.data_source_grafana_url
  description = "The URL to access the Grafana instance"
}


resource "azurerm_storage_account" "grafana_storage" {
  name                     = "grafanastorageacct"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"  # This sets it to General Purpose v2
  access_tier              = "Hot"        # Sets the access tier to Hot
  
  tags = {
    environment = "production"
  }
}

resource "azurerm_storage_container" "grafana_container" {
  name                  = "grafana-data"
  storage_account_name  = azurerm_storage_account.grafana_storage.name
  container_access_type = "private"
}

