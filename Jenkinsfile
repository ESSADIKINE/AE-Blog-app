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

        stage('Build Frontend Docker Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}-frontend ./frontend'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build --build-arg FRONTEND_IMAGE=${IMAGE_NAME}-frontend -t ${IMAGE_NAME}-backend ./backend'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker system prune -f'
            }
        }
    }
}
