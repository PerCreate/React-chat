import React, { useEffect, useRef, useState } from 'react'
import './Sidebar.scss'
import '../UI/Button.scss'
import { Chapter } from './Chapter/Chapter'

export const Sidebar = () => {
    const [state, setState] = useState({
        countChats: 0,
        chatName: '',
        isBtnPress: false,
        imgSrc: localStorage.getItem('img')
    })

    const inputEl = useRef(null)
    const inputFile = useRef(null)

    // Set chats to localStorage
    const setChats = event => {
        const chatName = event.target.value

        if (event.key !== 'Enter') return null

        setState(prev => ({
            ...prev,
            isBtnPress: false
        }))

        if (!chatName.trim()) return null

        const prevChats = JSON.parse(localStorage.getItem('chats'))

        const chats = JSON.stringify({
            ...prevChats,
            [chatName]: chatName
        })
        localStorage.setItem('chats', chats)
    }
    // set user photo to localStorage, show users img
    const setUserPhoto = (e) => {
        e.preventDefault()

        var file = e.target.files[0]
        var reader = new FileReader()

        if (!file || !file.type.match('image.*')) {
            return
        }

        reader.onload = ((theFile) => (e) => {
            var imgContainer = document.querySelector('.user-photo')
            imgContainer.innerHTML = ['<img class="photo" src="', e.target.result,
                '" title="', escape(theFile.name), '"/>'
            ].join('');

            localStorage.setItem('img', e.target.result);
        })(file);

        reader.readAsDataURL(file)
    }
    // check, if localStorage has img prop at first mount page, set this img
    useEffect(() => {
        if (localStorage.img) {

            var imgContainer = document.querySelector('.user-photo')
            imgContainer.innerHTML = ['<img class="photo" src="', localStorage.img,
            '" title="test"/>'].join('');
        }
    }, [])
    // focus on input, when button pressed
    useEffect(() => {
        inputEl.current && inputEl.current.focus()
    }, [state.isBtnPress])

    return (
        <div className='Sidebar'>
            <div className='btn-container'>
                <div className='user-data'>
                    <input
                        ref={inputFile}
                        type='file'
                        className='upload-file'
                        onChange={e => setUserPhoto(e)}
                    />
                    <div
                        onClick={() => inputFile.current.click()}
                        className='user-photo'
                    />
                    <span>Pershin Konstantin</span>
                </div>
                <button
                    className='img'
                    onClick={() => setState(prev => ({
                        ...prev,
                        isBtnPress: !state.isBtnPress
                    }))}
                />
            </div>
            <nav>
                <h2>MESSAGES</h2>
                <h5>history</h5>
                {
                    state.isBtnPress
                        ? <> <input
                            className='alert'
                            type='text'
                            ref={inputEl}
                            onKeyPress={setChats}
                            placeholder='new chat...'
                        /></>
                        : null
                }
                <Chapter chatName={state.chatName} countChats={state.countChats} />
            </nav>
        </div>
    )
}