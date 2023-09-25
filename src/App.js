import {useState, useEffect} from 'react'
import './App.css';

function PictureScreen() {
	const [ pictureUrl, setPictureUrl ] = useState(null)

	useEffect(() => {
		fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
			.then(response => response.json())
			.then(response => {
				// returns the thumbnail of the yt video if APOD is video type
				if (response['media_type'] === 'video') {
					return setPictureUrl('its a video')
				} 

				// and returns nothing if neither image nor video
				if (response['media_type'] !== 'image') {
					return setPictureUrl('Nothing for today')
				}

				// hdurl may not exist sometimes
				if ('hdurl' in response) {
					return setPictureUrl(response['hdurl'])
				}

				return setPictureUrl(response['url'])
			})
			.catch(error => console.log(error))
	}, [])

	return (
		<div id='apod-container'>
			<img src={pictureUrl} alt='NASA Astronomy pic of the day' id='main-apod'/>
		</div>
	)
}

function App() {
	return (
		<div>
			<PictureScreen />
		</div>
	)
}

export default App;
