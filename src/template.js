const template = `
    <audio class="auo__audio-ele"></audio>
    <div class="auo">
        <div class="auo__box">
            <div class="auo__button auo__play-button icon-play3"></div> 
            <div class="auo__time-display">
                <div class="auo__time-current">00:00</div>/
                <div class="auo__time-total">00:00</div>
            </div> 
            <div class="auo__progress">
                <div class="auo__progress-mask"></div>
                <div class="auo__progress-bar"></div>
                <!-- <div class="auo__progress-point"></div> -->
            </div>
            <div class="auo__button auo__mute-button icon-volume-high">
                <!-- <div class="auo__volume-container">
                    <div class="auo__volume-number">100</div>
                    <div class="auo__volume">
                        <div class="auo__volume-mask"></div>
                        <div class="auo__volume-bar"></div>
                    </div>
                </div> -->
            </div>
            <!-- <button class="auo__button auo__more-button icon-volume-more"></button> -->
        </div>
    </div>
`;

export default template;
