resource "kubernetes_deployment" "app-node" {
  metadata {
    name = "app-node"
    labels = {
      test = "app-node"
    }
  }

  spec {
    replicas = 4

    selector {
      match_labels = {
        test = "app-node"
      }
    }

    template {
      metadata {
        labels = {
          test = "app-node"
        }
      }

      spec {
        container {
          image = "rasonego/app-node:1.0"
          name  = "app-node"

          resources {
            limits = {
              cpu    = "0.5"
              memory = "512Mi"
            }
            requests = {
              cpu    = "250m"
              memory = "50Mi"
            }
          }

          liveness_probe {
            http_get {
              path = "/"
              port = 80

              http_header {
                name  = "X-Custom-Header"
                value = "Awesome"
              }
            }

            initial_delay_seconds = 3
            period_seconds        = 3
          }
        }
      }
    }
  }
}