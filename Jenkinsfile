/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    tools {
        nodejs 'NodeJS 23'  //Node.js
    }
    stages {
        stage('Clone Repository') {
            steps {
                //CLONE GITHUB REPOSITORY
                git 'https://github.com/Allan-Binga/Apartment-Management-System'
            }
        }
        stage('Install Dependencies') {
            steps {
                    sh 'npm install'
            }
        }
    }
    post {
        success {
            slackSend(
                channel: '#murandi-apartments',
                color: 'good',
                message: 'Successfully installed dependencies.'
            )
        }
        failure {
            slackSend(
                channel: '#murandi-apartments',
                color: 'danger',
                message: 'Successfully installed dependencies.'
            )
        }
    }
}
