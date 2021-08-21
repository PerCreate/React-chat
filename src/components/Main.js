import React, { useContext, useEffect } from 'react'
import { CountMessages } from '../context/CountMessages'
import './Main.scss'

export const Main = ({ children }) => {
	const { setCountMess } = useContext(CountMessages)
	useEffect(() => {
		setCountMess(0)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	return (
		<main className={'Main'}>
				{ children }
		</main>
	)
}