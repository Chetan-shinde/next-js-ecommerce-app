pipeline{
	agent any
	tools {
        nodejs 'Latest node' 
    }
	stages{
		stage('Build'){
			steps{
				sh 'npm install'
			}
		}	
	}
}