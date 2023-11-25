import { Routes, Route } from 'react-router-dom'
import Home from './page/Home/Home'

function App() {
  return (
		<Routes>
			<Route path="/:username/confessions" element={<Home />} />
		</Routes>
	);
}

export default App
