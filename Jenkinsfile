pipeline {
    agent any

    environment {
        IMAGE_NAME = "ae-blog-app"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/ESSADIKINE/AE-Blog-app.git'
            }
        }

        stage('Build and Run Containers') {
            steps {
                sh 'docker-compose down' // Stop old containers
                sh 'docker-compose build' // Build all services
                sh 'docker-compose up -d' // Run in detached mode
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker system prune -f'
            }
        }
    }
}
