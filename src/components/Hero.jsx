import { useState, useEffect, useCallback, useRef } from "react";
import "./Hero.css"

function Hero() {

    const [meme, setMeme] = useState({
        imageUrl: "http://i.imgflip.com/1otk96.jpg",
        texts: [
            { id: 1, content: "Is this...", x: 20, y: 0, dragging: false },
            { id: 2, content: "For Real??", x: 20, y: 80, dragging: false }
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
        <main className='flex flex-col bg-white w-full max-w-6xl p-9 h-auto rounded-b-lg shadow-lg'>
            <div className='form flex flex-col gap-6 w-full'>
                {meme.texts.map((text, index) => (
                    <label key={text.id} className='flex flex-col w-full'>
                        Text {index + 1}
                        <textarea className="flex border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-[80px]"
                            placeholder={`Text ${index + 1}`}
                            value={text.content}
                            onChange={(e) => handleChange(e, text.id)}
                            rows={4}
                            cols={30}
                        />
                    </label>
                ))}
                <button
                    className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white mt-4 py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full sm:w-auto'
                    onClick={getMemeImage}
                >
                    Get New Meme</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} alt="Meme" className="w-full max-h-[500px] object-contain rounded-lg" />
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
                className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white mt-4 py-2 px-4 border border-green-500 hover:border-transparent rounded w-full sm:w-auto'
                onClick={downloadMeme}
            >
                Download Meme</button>
            <canvas ref={canvasRef} style={{ display: "none" }} />
        </main>
    )
}

export default Hero