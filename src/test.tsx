import React, { useRef, useLayoutEffect } from 'react'
import { invoke } from '@tauri-apps/api/core' 

export default function Test() : React.ReactElement{
    const div = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(()=>{
        (async ()=>{
            if (!div.current) return
            let hai: string = await invoke('just_testing', {msg : "hello"});
            div.current.innerText = hai
        })()
    },[])
    return(
        <>
            <div ref={div}></div>
        </>
    )
}