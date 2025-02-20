import { useState, useEffect, useCallback, useRef } from "react";
import "./Hero.css"

function Hero() {

    const [meme, setMeme] = useState({
        imageUrl: "http://i.imgflip.com/1bij.jpg",
        texts: [
            { id: 1, content: "One does not simply", x: 20, y: 0, dragging: false },
            { id: 2, content: "Walk into Mordor", x: 20, y: 80, dragging: false }
        ]
    });

    const [allMemes, setAllMemes] = useState([]);
    const canvasRef = useRef(null);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes));
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const newMemeUrl = allMemes[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: newMemeUrl
        }));
    }

    function handleChange(event, id) {
        const { value } = event.currentTarget;
        setMeme(prevMeme => ({
            ...prevMeme,
            texts: prevMeme.texts.map(text =>
                text.id === id ? { ...text, content: value } : text
            )
        }));
    }

    const handleKeyDown = useCallback((event) => {
        const step = 2;
        setMeme(prevMeme => ({
            ...prevMeme,
            texts: prevMeme.texts.map(text =>
                text.dragging
                    ? {
                        ...text,
                        x: event.key === "ArrowLeft" ? text.x - step :
                            event.key === "ArrowRight" ? text.x + step : text.x,
                        y: event.key === "ArrowUp" ? text.y - step :
                            event.key === "ArrowDown" ? text.y + step : text.y
                    }
                    : text
            )
        }));
    }, []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    function startDragging(id) {
        setMeme(prevMeme => ({
            ...prevMeme,
            texts: prevMeme.texts.map(text =>
                text.id === id ? { ...text, dragging: true } : { ...text, dragging: false }
            )
        }));
    }

    function downloadMeme() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");


        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = meme.imageUrl;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            meme.texts.forEach(text => {
                ctx.font = "30px Impact";
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.textAlign = "left";
                ctx.textBaseline = "top";


                const x = (text.x / 100) * canvas.width;
                const y = (text.y / 100) * canvas.height;

                ctx.strokeText(text.content, x, y);
                ctx.fillText(text.content, x, y);
            });

            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "meme.png";
            link.click();
        };
    }


    return (
        <main className='bg-white w-300 p-9 h-auto'>
            <div className='form'>
                {meme.texts.map((text, index) => (
                    <label key={text.id}>
                        Text {index + 1}
                        <textarea
                            placeholder={`Text ${index + 1}`}
                            value={text.content}
                            onChange={(e) => handleChange(e, text.id)}
                            rows={4}
                            cols={30}
                        />
                    </label>
                ))}
                <button
                    className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                    onClick={getMemeImage}
                >
                    Get New Meme</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} alt="Meme" />
                {meme.texts.map((text) => (
                    <span
                        key={text.id}
                        style={{
                            position: "absolute",
                            top: `${text.y}%`,
                            left: `${text.x + 18}%`,
                            cursor: "pointer",
                            whiteSpace: "pre-line",
                        }}
                        onClick={() => startDragging(text.id)}>
                        {text.content}
                    </span>
                ))}
            </div>
            <button
                className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'
                onClick={downloadMeme}
            >
                Download Meme</button>
            <canvas ref={canvasRef} style={{ display: "none" }} />
        </main>
    )
}

export default Hero