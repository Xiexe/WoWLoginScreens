var expansion = 8;
var audioSelect = {
    'Vanilla' : './assets/audio/Vanilla.ogg',
    'BurningCrusade' : './assets/audio/BurningCrusade.ogg',
    'WrathOfTheLichKing' : './assets/audio/WrathOfTheLichKing.ogg',
    'Cataclysm' : './assets/audio/Cataclysm.ogg',
    'MistsOfPandaria' : './assets/audio/MistsOfPandaria.ogg',
    'WarlordsOfDraenor' : './assets/audio/WarlordsOfDraenor.ogg',
    'Legion' : './assets/audio/Legion.ogg',
    'BattleForAzeroth' : './assets/audio/BattleForAzeroth.ogg',
    'Shadowlands' : './assets/audio/Shadowlands.ogg'
}
var videoSelect = {
    'Vanilla' : './assets/img/bg/Vanilla.webm',
    'BurningCrusade' : './assets/img/bg/BurningCrusade.webm',
    'WrathOfTheLichKing' : './assets/img/bg/WrathOfTheLichKing.webm',
    'Cataclysm' : './assets/img/bg/Cataclysm.webm',
    'MistsOfPandaria' : './assets/img/bg/MistsOfPandaria.webm',
    'WarlordsOfDraenor' : './assets/img/bg/WarlordsOfDraenor.webm',
    'Legion' : './assets/img/bg/Legion.webm',
    'BattleForAzeroth' : './assets/img/bg/BattleForAzeroth.webm',
    'Shadowlands' : './assets/img/bg/Shadowlands.webm'
}
var logoSelect = {
    'Vanilla' : './assets/img/ui/logos/Vanilla.png',
    'BurningCrusade' : './assets/img/ui/logos/BurningCrusade.png',
    'WrathOfTheLichKing' : './assets/img/ui/logos/WrathOfTheLichKing.png',
    'Cataclysm' : './assets/img/ui/logos/Cataclysm.png',
    'MistsOfPandaria' : './assets/img/ui/logos/MistsOfPandaria.png',
    'WarlordsOfDraenor' : './assets/img/ui/logos/WarlordsOfDraenor.png',
    'Legion' : './assets/img/ui/logos/Legion.png',
    'BattleForAzeroth' : './assets/img/ui/logos/BattleForAzeroth.png',
    'Shadowlands' : './assets/img/ui/logos/Shadowlands.png',
}
var audio = new Audio();
var buttonAudio = new Audio();
var audioInitialPlayback = false;
var queuePos = null;
var disconnected = false;

function init()
{
    switchExpansion();
    window.addEventListener('click', waitForInteractionToPlayAudio);

    getPositionInQueue();
    setInterval(determineIfDisconnect, 8000);
}

function waitForInteractionToPlayAudio()
{
    if(!audioInitialPlayback)
    {
        buttonAudio.volume = 0.5;
        audio.volume = 0.5;
        audio.loop = true;
        audio.play();
        audioInitialPlayback = true;
    }
}

function determineIfDisconnect()
{
    if(!disconnected)
    {
        var rand = Math.random();
        if(rand < 0.75)
            getPositionInQueue();
    }
}

function getPositionInQueue()
{
    var number;
    if(queuePos === null)
    {    
        number = Math.floor(Math.random() * Math.floor(10000));
        queuePos = number;
    }
    else
    {
        number = Math.floor(queuePos - (Math.random() * Math.floor(15)));
        queuePos = number;

        if(queuePos < 3)
        {
            number = 0;
            queuePos = 0;
            doDisconnect();
        }
    }

    document.getElementById('queuePosition').innerHTML = 'Position in Queue: ' + number;
    getEstimatedTime(number)
}

function getEstimatedTime(qPos)
{
    var time = Math.floor(Math.floor(qPos*2*3*2 + ((qPos*2*3*3) - (qPos*2*3*2)) * Math.random()) * 0.01);
    document.getElementById('queueTime').innerHTML = 'Estimated time: ' + time + ' min';
}

function doDisconnect()
{
    hideQueue();
    showDisconnect();
    playButtonAudio(1);
    disconnected = true;
    console.log("DC'd")
}

function manualChangeExpac()
{
    console.log("Changing xpac to: ");
    expansion += 1;
    if(expansion > 8)
        expansion = 0;
    
    var bg = document.getElementById('background');
    bg.muted = false;
    switchExpansion();
}

function switchExpansion()
{
    if(disconnected)
    {
        disconnected = false;
        hideQueue();
        showDisconnect();
    }
    queuePos = null;
    getPositionInQueue();

    var bg = document.getElementById('background');
    var logo = document.getElementById('logo');
    var version = document.getElementById('buildVersion');
    var date = document.getElementById('buildDate');
    var copyright = document.getElementById('copyrightText');
    
    audio.pause();
    switch(expansion)
    {
        case 0:
            console.log('Vanilla');
            audio.src = audioSelect.Vanilla;
            bg.setAttribute('src', videoSelect.Vanilla);
            logo.style.background = `url(${logoSelect.Vanilla})`;
            version.innerHTML = 'Version 1.12.1 (5875) (Release)';
            date.innerHTML = 'Sept 19 2006';
            copyright.innerHTML = 'Copyright 2004-2006 Blizzard Entertainment. All Right Reserved.';
        break;

        case 1:
            console.log('Burning Crusade');
            audio.src = audioSelect.BurningCrusade;
            bg.setAttribute('src', videoSelect.BurningCrusade);
            logo.style.background = `url(${logoSelect.BurningCrusade})`;
            version.innerHTML = 'Version 2.4.3 (8606) (Release)';
            date.innerHTML = 'Jul 10 2008';
            copyright.innerHTML = 'Copyright 2004-2008 Blizzard Entertainment. All Right Reserved.';
        break;

        case 2:
            console.log('Wrath of the Lich King');
            audio.src = audioSelect.WrathOfTheLichKing;
            bg.setAttribute('src', videoSelect.WrathOfTheLichKing);
            logo.style.background = `url(${logoSelect.WrathOfTheLichKing})`;
            version.innerHTML = 'Version 3.3.5 (12340) (Release)';
            date.innerHTML = 'Jun 24 2010';
            copyright.innerHTML = 'Copyright 2004-2010 Blizzard Entertainment. All Right Reserved.';
        break;

        case 3:
            console.log('Cataclysm');
            audio.src = audioSelect.Cataclysm;
            bg.setAttribute('src', videoSelect.Cataclysm);
            logo.style.background = `url(${logoSelect.Cataclysm})`;
            version.innerHTML = 'Version 4.3.4 (15595) (Release x86)';
            date.innerHTML = 'Feb 9 2011';
            copyright.innerHTML = 'Copyright 2004-2011 Blizzard Entertainment. All Right Reserved.';
        break;

        case 4:
            console.log('Mists of Pandaria');
            audio.src = audioSelect.MistsOfPandaria;
            bg.setAttribute('src', videoSelect.MistsOfPandaria);
            logo.style.background = `url(${logoSelect.MistsOfPandaria})`;
            version.innerHTML = 'Version 5.4.8 (18414) (Release x86)';
            date.innerHTML = 'Jun 13 2014';
            copyright.innerHTML = 'Copyright 2004-2014 Blizzard Entertainment. All Right Reserved.';
        break;

        case 5:
            console.log('Warlords of Draenor');
            audio.src = audioSelect.WarlordsOfDraenor;
            bg.setAttribute('src', videoSelect.WarlordsOfDraenor);
            logo.style.background = `url(${logoSelect.WarlordsOfDraenor})`;
            version.innerHTML = 'Version 6.2.0 (20173) (Release x64)';
            date.innerHTML = 'Jun 20 2015';
            copyright.innerHTML = 'Copyright 2004-2015 Blizzard Entertainment. All Right Reserved.';
        break;

        case 6:
            console.log('Legion');
            audio.src = audioSelect.Legion;
            bg.setAttribute('src', videoSelect.Legion);
            logo.style.background = `url(${logoSelect.Legion})`;
            version.innerHTML = 'Version 7.3.5 (26365) (Release x64)';
            date.innerHTML = 'Apr 3 2018';
            copyright.innerHTML = 'Copyright 2004-2018 Blizzard Entertainment. All Right Reserved.';
        break;

        case 7:
            console.log('Battle for Azeroth');
            audio.src = audioSelect.BattleForAzeroth;
            bg.setAttribute('src', videoSelect.BattleForAzeroth);
            logo.style.background = `url(${logoSelect.BattleForAzeroth})`;
            version.innerHTML = 'Version 8.3.7 (35662) (Release x64)';
            date.innerHTML = 'Aug 24 2020';
            copyright.innerHTML = 'Copyright 2004-2020 Blizzard Entertainment. All Right Reserved.';
        break;

        case 8:
            console.log('Shadowlands');
            audio.src = audioSelect.Shadowlands;
            bg.setAttribute('src', videoSelect.Shadowlands);
            logo.style.background = `url(${logoSelect.Shadowlands})`;
            version.innerHTML = 'Version 9.0.1 (35944) (Release x64)';
            date.innerHTML = 'Oct 13 2020';
            copyright.innerHTML = 'Copyright 2004-2020 Blizzard Entertainment. All Right Reserved.';
        break;
    }
    audio.play();
}

function playButtonAudio(index)
{
    buttonAudio.pause();
    buttonAudio.time = 0;

    if(index === 0)
        buttonAudio.src = './assets/audio/ui/button_click.ogg';
    else
        buttonAudio.src = './assets/audio/ui/button_click_big.ogg';
    
    buttonAudio.play();
}

function hideQueue()
{
    var x = document.getElementById("queue");
    if(x.style.display === "none")
        x.style.display = "flex";
    else
        x.style.display = "none";
}

function showDisconnect()
{
    var x = document.getElementById("disconnectBox");
    if(x.style.display === "none")
        x.style.display = "flex";
    else
        x.style.display = "none";
}