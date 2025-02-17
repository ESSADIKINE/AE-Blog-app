pipeline {
    agent any

    environment {
        IMAGE_NAME = "ae-blog-app"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/ESSADIKINE/AE-Blog-app.git'
            }
        }

        stage('Build and Run Containers') {
            steps {
                sh 'docker-compose up --build -d'
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker system prune -f'
            }
        }
    }
}
