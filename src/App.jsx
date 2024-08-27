import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // 画像のURLを保持するstate
  const [image, setImage] = useState();
  // APIの取得ステータスを保持するstate
  const [apiStatus, setApiStatus] = useState();

  /**
   * 画像を取得する関数
   * @returns {void}
   * @description 画像を取得してimageに代入する
   */
  const imageFetch = () => {
    fetch('https://dog.ceo/api/breeds/image/random', {method: 'GET'}) 
    // fetch('https://oaidalleapiprodscus.blob.core.windows.net/private/org-JXg8cxNwWXYaOmWgrCXZa7gv/user-qkHRKuvi2dYZRyS3dcD5WgkL/img-t0JAUAah3vMshfqnTXxLJAz8.png?st=2024-08-05T10%3A01%3A27Z&se=2024-08-05T12%3A01%3A27Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-08-05T04%3A31%3A10Z&ske=2024-08-06T04%3A31%3A10Z&sks=b&skv=2023-11-03&sig=6ZyQGGLzNlMLhBc4p/q0/erhqc7MmcunjCLNmVwvZ5I%3D', {method: 'GET'})
    .then((response) => response.json())
    .then((data) => {
      setImage(data.message)
      setApiStatus(data.status)
    })
  }

  /**
   * 初回レンダリング時に画像を取得するためのuseEffect
   * @returns {void}
   * @description 初回レンダリング時に画像を取得する
   */
  useEffect(() => {
    imageFetch();

    /**
     * 一定時間ごとに画像を取得するためのsetInterval
     * @returns {void}
     * @description 一定時間ごとに画像を取得する
     */
    const interval = setInterval(() => {
      imageFetch();
    }, 5000); // 今は一旦5秒間隔に設定

    return () => clearInterval(interval);

  }, [])

  return (
    <>
      <div className='imageDetails'>
        <img src={image} alt='createdImage' />
        <p className='description'>画像の生成文をここに表示する予定 {apiStatus}</p>
        <p className='description'>画像の生成を行った人の名前をここに表示する予定 {apiStatus}様寄贈</p>
      </div>
      {/* <h1>Vite + React</h1> */}
    </>
  )
}

export default App
