import React , {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Spinner from '../util/Spinner';


const MagentaDemo = () => {


    const [loaded , setLoaded] = useState(false);
    var player = null;
    var music_vae = null;
    var rnnPlayer = null;
    var vaePlayer = null;

    const TWINKLE_TWINKLE = {
        notes: [
        {pitch: 60, startTime: 0.0, endTime: 0.5},
        {pitch: 60, startTime: 0.5, endTime: 1.0},
        {pitch: 67, startTime: 1.0, endTime: 1.5},
        {pitch: 67, startTime: 1.5, endTime: 2.0},
        {pitch: 69, startTime: 2.0, endTime: 2.5},
        {pitch: 69, startTime: 2.5, endTime: 3.0},
        {pitch: 67, startTime: 3.0, endTime: 4.0},
        {pitch: 65, startTime: 4.0, endTime: 4.5},
        {pitch: 65, startTime: 4.5, endTime: 5.0},
        {pitch: 64, startTime: 5.0, endTime: 5.5},
        {pitch: 64, startTime: 5.5, endTime: 6.0},
        {pitch: 62, startTime: 6.0, endTime: 6.5},
        {pitch: 62, startTime: 6.5, endTime: 7.0},
        {pitch: 60, startTime: 7.0, endTime: 8.0},  
        ],
        totalTime: 8
    };

    useEffect(async () => {

        player =await new window.window.mm.Player();
        player = await new window.window.mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
        rnnPlayer = await new window.window.mm.Player();
        if (player) {
            setLoaded(true)
        }
    });
    
    
    const onClickHandler = (e) => {
        e.preventDefault();
        player.start(TWINKLE_TWINKLE);
    }
    
    const onStopHandler = (e) => {
        e.preventDefault();
        player.stop();
    }
    
    const tempfunction = async (e) => {
        e.preventDefault();
        try {
            music_vae = await new window.window.mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
            music_vae.initialize();
            console.log(music_vae)
            vaePlayer = await new window.window.mm.Player();
            const vae_temperature = 1.0;
            function playVAE() {
                if (vaePlayer.isPlaying()) {
                    vaePlayer.stop();
                    return;
                }
            music_vae
                .sample(1, vae_temperature)
                .then((sample) => vaePlayer.start(sample[0]));
                }
        }
         catch (e) {
            console.log("Jump into error loop")
            console.log(e)
        }


    };
    

    if (loaded) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <button class="ui icon button" onClick={onClickHandler}>
                            <i class="play icon"></i>
                        </button>
                    </div>
                    <div  className="col-sm">
                        <button class="ui icon button" onClick={onStopHandler}>
                            <i class="stop icon"></i>
                        </button>
                        <button onClick={tempfunction}>Start!</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <Spinner message="Loading Player" />
        );
    }
    
};

export default MagentaDemo;