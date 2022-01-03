$(function () {
    let enemyName = ['', 'しっこくのきし', 'みならいのきし', 'もりのようせい'];
    let name = '';
    let ySymbol;
    let xSymbol;
    if($(window).width() < 1000) {
        //スマホ処理
        ySymbol = [128, 32, 160, 288];
        xSymbol = [700, 400, 540, 680];

	} else {
        //PC処理
        ySymbol = [320, 240, 480, 720];
        xSymbol = [1400, 960, 1200, 1440];
	}
    let symbolId = ['#chara', '#monster', '#human', '#fairy'];
    let charaDirection = ['#chara1', '#chara2', '#chara3', '#chara4'];
    let monsterDirection = ['#monster1', '#monster2', '#monster3', '#monster4'];
    let humanDirection = ['#human1', '#human2', '#human3', '#human4'];
    let fairyDirection = ['#fairy1', '#fairy2', '#fairy3', '#fairy4'];
    let direction = [charaDirection, monsterDirection, humanDirection, fairyDirection];
    let notCharaDirection = [];
    let notMonsterDirection = [];
    let notHumanDirection = [];
    let notFairyDirection = [];
    let notDirection = [notCharaDirection, notMonsterDirection, notHumanDirection, notFairyDirection];
    let dis;
    if($(window).width() < 1000) {
        //スマホ処理
        dis = 18;

	} else {
        //PC処理
        dis = 36;
	}
    let battleEnemy = ['', '#battle-monster', '#battle-human', '#battle-fairy'];
    let enemy = '';
    let wins = 0;
    let loses = 0;
    let mpUse = 0;
    let enemyThreshold = 0;
    const myThreshold = 10;
    let input_cmd = [];
    let ending_cmd = [69, 78, 68, 73, 78, 71, 13];
    let beat_cmd = [66, 69, 65, 84, 13];

    $(window).ready(function () {
        console.log('一瞬で世界を平和にする→' + ending_cmd);
        console.log('一瞬で敵を倒す→' + beat_cmd);
        $('#sponsor').addClass('visible');
        setTimeout(function () {
            $('#sponsor').removeClass('visible');
        }, 2000);
        setTimeout(function () {
            $('#sponsor').remove();
            $('#title').addClass('appear');
        }, 3000);
    });

    $('.title-menu').on('click', function () {
        $('#start').remove();
        $('#field-bgm').get(0).play();
        if ($(window).width() < 1000) {
            //スマホ処理
            $('#arrows').addClass('active');
        } else {
            $('#arrows').removeClass('active');
        }
    });

    $(document).on('keyup', function (e) {
        input_cmd.push(e.keyCode);
        console.log(input_cmd);
        // コマンド入力
        if (input_cmd[input_cmd.length - 1] !== ending_cmd[input_cmd.length - 1] &&
            input_cmd[input_cmd.length - 1] !== beat_cmd[input_cmd.length - 1]) {
            // 入力を間違えた場合、入力キー配列をリセット（最初からやり直し）
            input_cmd = [];
        }
        // 全ての入力コマンドが合致したら処理を発動
        else if (input_cmd.length === ending_cmd.length) {
            // 隠しコマンドによる処理実行！
            finish();
            let timerId = setInterval( ()=>{
                // ボリュームが0になったら終了
                if( ($('#field-bgm').get(0).volume - 0.1) <= 0 ){
                    $('#field-bgm').get(0).volume = 0;
                    $('#field-bgm').get(0).pause();
                    $('#field-bgm').get(0).currentTime = 0;
                    clearInterval(timerId);  //タイマー解除
                }
                // 0.1ずつボリュームを減らしていく
                else{
                    $('#field-bgm').get(0).volume -= 0.1;
                }
            }, 200);
            setTimeout(function () {
                $('#ending').addClass('visible');
                $('#ending-bgm').get(0).play();
            }, 4000);
            setTimeout(function () {
                $('#ending').addClass('slide');
            }, 6000);
            setTimeout(function () {
                $('#celebrate').addClass('visible');
            }, 51000);
            // 処理後、改めて入力キー配列をリセット
            input_cmd = [];
        } else if (input_cmd.length === beat_cmd.length) {
            for (let j = 1; j < ySymbol.length; j++) {
                if (Math.sqrt((Math.abs((ySymbol[0] + 24) - (ySymbol[j] + 24)) ** 2) + (Math.abs((xSymbol[0] + 19) - (xSymbol[j] + 19)) ** 2)) <= 32) {
                    wins = 10;
                    enemyThreshold = 10;
                    $('#enemy-hp-gauge').css('width', (100 * (enemyThreshold - wins) / enemyThreshold) + '%');
                    $('#disappear').get(0).play();
                    let timerId1 = setInterval( ()=>{
                        // ボリュームが0になったら終了
                        if( ($('#battle-bgm').get(0).volume - 0.1) <= 0 ){
                            $('#battle-bgm').get(0).volume = 0;
                            $('#battle-bgm').get(0).pause();
                            $('#battle-bgm').get(0).currentTime = 0;
                            clearInterval(timerId1);  //タイマー解除
                        }
                        // 0.1ずつボリュームを減らしていく
                        else{
                            $('#battle-bgm').get(0).volume -= 0.1;
                        }
                    }, 400);
                    let timerId2 = setInterval( ()=>{
                        // ボリュームが0になったら終了
                        if( ($('#darkknight-bgm').get(0).volume - 0.1) <= 0 ){
                            $('#darkknight-bgm').get(0).volume = 0;
                            $('#darkknight-bgm').get(0).pause();
                            $('#darkknight-bgm').get(0).currentTime = 0;
                            clearInterval(timerId2);  //タイマー解除
                        }
                        // 0.1ずつボリュームを減らしていく
                        else{
                            $('#darkknight-bgm').get(0).volume -= 0.1;
                        }
                    }, 400);
                    if (name === 'しっこくのきし') {
                        $('#battle-monster').removeClass('visible');
                        $('#monster').remove();
                        ySymbol[1] = 0;
                        xSymbol[1] = 0;
                    } else if (name === 'みならいのきし') {
                        $('#battle-human').removeClass('visible');
                        $('#human').remove();
                        ySymbol[2] = 0;
                        xSymbol[2] = 0;
                    } else if (name === 'もりのようせい') {
                        $('#battle-fairy').removeClass('visible');
                        $('#fairy').remove();
                        ySymbol[3] = 0;
                        xSymbol[3] = 0;
                    }
                    setTimeout(function () {
                        $('#disappear').get(0).pause();
                        $('#disappear').get(0).currentTime = 0;
                        $('#beat').get(0).play();
                        $('#battle-text').text(`${name}を　たおした！`);
                        $('#battle-commands').removeClass('appear');
                    }, 2000);
                    setTimeout(function () {
                        $('#beat').get(0).pause();
                        $('#beat').get(0).currentTime = 0;
                        $('#battle-bgm').get(0).volume = 0.5;
                        $('#field-bgm').get(0).volume = 1;
                        $('#field-bgm').get(0).play();
                        $('#splash').removeClass('effect2');
                        $('#message').removeClass('encount');
                        $('#battle-window').removeClass('visible');
                        $('.hp').removeClass('visible');
                        $('.mp').removeClass('visible');
                        $('#left-black').removeClass('sideblack');
                        $('#right-black').removeClass('sideblack');
                        $('#arrows').addClass('active');
                        wins = 0;
                    }, 4000);
                    setTimeout(function () {
                        // 処理後、改めて入力キー配列をリセット
                        input_cmd = [];
                        $('#enemy-hp-gauge').css('width', (100 * (enemyThreshold - wins) / enemyThreshold) + '%');
                        if ($('.icon').length === 0) {
                            finish();
                            let timerId = setInterval( ()=>{
                                // ボリュームが0になったら終了
                                if( ($('#field-bgm').get(0).volume - 0.1) <= 0 ){
                                    $('#field-bgm').get(0).volume = 0;
                                    $('#field-bgm').get(0).pause();
                                    $('#field-bgm').get(0).currentTime = 0;
                                    clearInterval(timerId);  //タイマー解除
                                }
                                // 0.1ずつボリュームを減らしていく
                                else{
                                    $('#field-bgm').get(0).volume -= 0.1;
                                }
                            }, 200);
                            setTimeout(function () {
                                $('#ending').addClass('visible');
                                $('#ending-bgm').get(0).play();
                            }, 4000);
                            setTimeout(function () {
                                $('#ending').addClass('slide');
                            }, 6000);
                            setTimeout(function () {
                                $('#celebrate').addClass('visible');
                            }, 51000);
                        }
                    }, 5000);
                }
            }
        }
    });

    $(document).on('keyup', function (e) {
        // console.log("キーコード：" + e.keyCode);

        if (Math.sqrt((Math.abs((ySymbol[0] + 24) - (ySymbol[1] + 24)) ** 2) + (Math.abs((xSymbol[0] + 19) - (xSymbol[1] + 19)) ** 2)) <= 32 ||
            Math.sqrt((Math.abs((ySymbol[0] + 24) - (ySymbol[2] + 24)) ** 2) + (Math.abs((xSymbol[0] + 19) - (xSymbol[2] + 19)) ** 2)) <= 32 ||
            Math.sqrt((Math.abs((ySymbol[0] + 24) - (ySymbol[3] + 24)) ** 2) + (Math.abs((xSymbol[0] + 19) - (xSymbol[3] + 19)) ** 2)) <= 32) {
            return false;
        }

        switch (e.keyCode) {
            case 38: // ↑
                notCharaDirection = charaDirection.filter((value, index) => index !== 3);
                $(charaDirection[3]).addClass('now-direction');
                $(notCharaDirection.join(',')).removeClass('now-direction');
                move1(-dis, 0);
                break;
            case 37: // ←
                notCharaDirection = charaDirection.filter((value, index) => index !== 1);
                $(charaDirection[1]).addClass('now-direction');
                $(notCharaDirection.join(',')).removeClass('now-direction');
                move1(0, -dis);
                break;
            case 39: // →
                notCharaDirection = charaDirection.filter((value, index) => index !== 2);
                $(charaDirection[2]).addClass('now-direction');
                $(notCharaDirection.join(',')).removeClass('now-direction');
                move1(0, dis);
                break;
            case 40: // ↓
                notCharaDirection = charaDirection.filter((value, index) => index !== 0);
                $(charaDirection[0]).addClass('now-direction');
                $(notCharaDirection.join(',')).removeClass('now-direction');
                move1(dis, 0);
                break;
            default:
        }

        for (let i = 1; i < ySymbol.length; i++) {
            if (e.keyCode >= 37 && e.keyCode <= 40) {
                let randomNumber3 = Math.floor(Math.random() * 4);
                if (randomNumber3 === 0) {
                    notDirection[i] = direction[i].filter((value, index) => index !== 3);
                    $(direction[i][3]).addClass('now-direction');
                    $(notDirection[i].join(',')).removeClass('now-direction');
                    move(-dis, 0, ySymbol[i], xSymbol[i], symbolId[i]);
                } else if (randomNumber3 === 1) {
                    notDirection[i] = direction[i].filter((value, index) => index !== 1);
                    $(direction[i][1]).addClass('now-direction');
                    $(notDirection[i].join(',')).removeClass('now-direction');
                    move(0, -dis, ySymbol[i], xSymbol[i], symbolId[i]);
                } else if (randomNumber3 === 2) {
                    notDirection[i] = direction[i].filter((value, index) => index !== 2);
                    $(direction[i][2]).addClass('now-direction');
                    $(notDirection[i].join(',')).removeClass('now-direction');
                    move(0, dis, ySymbol[i], xSymbol[i], symbolId[i]);
                } else if (randomNumber3 === 3) {
                    notDirection[i] = direction[i].filter((value, index) => index !== 0);
                    $(direction[i][0]).addClass('now-direction');
                    $(notDirection[i].join(',')).removeClass('now-direction');
                    move(dis, 0, ySymbol[i], xSymbol[i], symbolId[i]);
                } else {
                    alert('Error!');
                }
            }
        }

        for (let j = 1; j < ySymbol.length; j++) {
            if (Math.sqrt((Math.abs((ySymbol[0] + 24) - (ySymbol[j] + 24)) ** 2) + (Math.abs((xSymbol[0] + 19) - (xSymbol[j] + 19)) ** 2)) <= 32) {
                $('#arrows').removeClass('active');
                wins = 0;
                let timerId = setInterval( ()=>{
                    // ボリュームが0になったら終了
                    if( ($('#field-bgm').get(0).volume - 0.1) <= 0 ){
                        $('#field-bgm').get(0).volume = 0;
                        $('#field-bgm').get(0).pause();
                        $('#field-bgm').get(0).currentTime = 0;
                        clearInterval(timerId);  //タイマー解除
                    }
                    // 0.1ずつボリュームを減らしていく
                    else{
                        $('#field-bgm').get(0).volume -= 0.1;
                    }
                }, 200);

                setTimeout(function () {
                    $('#message').addClass('encount');
                    $('#left-black').addClass('sideblack')
                    $('#right-black').addClass('sideblack')
                }, 300);
                setTimeout(function () {
                    $('#message').addClass('effect');
                    const effectId = setInterval(function () {
                        $('#message').removeClass('effect');
                        setTimeout(function () {
                            $('#message').addClass('effect');
                        }, 50)
                    }, 100);
                    setTimeout(function () {
                        clearInterval(effectId);
                    }, 650);
                }, 1300);
                setTimeout(function () {
                    $('#message').removeClass('effect');
                    $('#splash').addClass('effect2');
                    $('#battle-start').get(0).volume = 0.5;
                    $('#battle-start').get(0).play();
                }, 2000);
                setTimeout(function () {
                    $(battleEnemy[j]).addClass('visible');
                }, 4000);
                setTimeout(function () {
                    $('#battle-start').get(0).pause();
                    $('#battle-start').get(0).currentTime = 0;
                    $('#battle-window').addClass('visible');
                    $('#battle-text').text(enemyName[j] + 'が　あらわれた！')
                    if (enemyName[j] === 'しっこくのきし') {
                        $('#darkknight-bgm').get(0).volume = 0.5;
                        $('#darkknight-bgm').get(0).play();
                    } else {
                        $('#battle-bgm').get(0).volume = 0.5;
                        $('#battle-bgm').get(0).play();
                    }
                }, 5000);
                setTimeout(function () {
                    $('#battle-commands').addClass('appear');
                    $('.hp').addClass('visible');
                    $('.mp').addClass('visible');
                }, 8000);
                enemy = battleEnemy[j];
                name = enemyName[j];
            }
        }
    });

    $(document).on('click', 'i', function () {
        // console.log("キーコード：" + e.keyCode);

        if (Math.sqrt((Math.abs((ySymbol[0] + 24) - (ySymbol[1] + 24)) ** 2) + (Math.abs((xSymbol[0] + 19) - (xSymbol[1] + 19)) ** 2)) <= 32 ||
            Math.sqrt((Math.abs((ySymbol[0] + 24) - (ySymbol[2] + 24)) ** 2) + (Math.abs((xSymbol[0] + 19) - (xSymbol[2] + 19)) ** 2)) <= 32 ||
            Math.sqrt((Math.abs((ySymbol[0] + 24) - (ySymbol[3] + 24)) ** 2) + (Math.abs((xSymbol[0] + 19) - (xSymbol[3] + 19)) ** 2)) <= 32) {
            return false;
        }

        switch (this.id) {
            case 'up': // ↑
                notCharaDirection = charaDirection.filter((value, index) => index !== 3);
                $(charaDirection[3]).addClass('now-direction');
                $(notCharaDirection.join(',')).removeClass('now-direction');
                move1(-dis, 0);
                break;
            case 'left': // ←
                notCharaDirection = charaDirection.filter((value, index) => index !== 1);
                $(charaDirection[1]).addClass('now-direction');
                $(notCharaDirection.join(',')).removeClass('now-direction');
                move1(0, -dis);
                break;
            case 'right': // →
                notCharaDirection = charaDirection.filter((value, index) => index !== 2);
                $(charaDirection[2]).addClass('now-direction');
                $(notCharaDirection.join(',')).removeClass('now-direction');
                move1(0, dis);
                break;
            case 'down': // ↓
                notCharaDirection = charaDirection.filter((value, index) => index !== 0);
                $(charaDirection[0]).addClass('now-direction');
                $(notCharaDirection.join(',')).removeClass('now-direction');
                move1(dis, 0);
                break;
            default:
        }

        for (let i = 1; i < ySymbol.length; i++) {
            let randomNumber3 = Math.floor(Math.random() * 4);
            if (randomNumber3 === 0) {
                notDirection[i] = direction[i].filter((value, index) => index !== 3);
                $(direction[i][3]).addClass('now-direction');
                $(notDirection[i].join(',')).removeClass('now-direction');
                move(-dis, 0, ySymbol[i], xSymbol[i], symbolId[i]);
            } else if (randomNumber3 === 1) {
                notDirection[i] = direction[i].filter((value, index) => index !== 1);
                $(direction[i][1]).addClass('now-direction');
                $(notDirection[i].join(',')).removeClass('now-direction');
                move(0, -dis, ySymbol[i], xSymbol[i], symbolId[i]);
            } else if (randomNumber3 === 2) {
                notDirection[i] = direction[i].filter((value, index) => index !== 2);
                $(direction[i][2]).addClass('now-direction');
                $(notDirection[i].join(',')).removeClass('now-direction');
                move(0, dis, ySymbol[i], xSymbol[i], symbolId[i]);
            } else if (randomNumber3 === 3) {
                notDirection[i] = direction[i].filter((value, index) => index !== 0);
                $(direction[i][0]).addClass('now-direction');
                $(notDirection[i].join(',')).removeClass('now-direction');
                move(dis, 0, ySymbol[i], xSymbol[i], symbolId[i]);
            } else {
                alert('Error!');
            }
        }

        for (let j = 1; j < ySymbol.length; j++) {
            if (Math.sqrt((Math.abs((ySymbol[0] + 24) - (ySymbol[j] + 24)) ** 2) + (Math.abs((xSymbol[0] + 19) - (xSymbol[j] + 19)) ** 2)) <= 32) {
                $('#arrows').removeClass('active');

                wins = 0;

                let timerId = setInterval( ()=>{
                    // ボリュームが0になったら終了
                    if( ($('#field-bgm').get(0).volume - 0.1) <= 0 ){
                        $('#field-bgm').get(0).volume = 0;
                        $('#field-bgm').get(0).pause();
                        $('#field-bgm').get(0).currentTime = 0;
                        clearInterval(timerId);  //タイマー解除
                    }
                    // 0.1ずつボリュームを減らしていく
                    else{
                        $('#field-bgm').get(0).volume -= 0.1;
                    }
                }, 200);

                setTimeout(function () {
                    $('#message').addClass('encount');
                    $('#left-black').addClass('sideblack')
                    $('#right-black').addClass('sideblack')
                }, 300);
                setTimeout(function () {
                    $('#message').addClass('effect');
                    const effectId = setInterval(function () {
                        $('#message').removeClass('effect');
                        setTimeout(function () {
                            $('#message').addClass('effect');
                        }, 50)
                    }, 100);
                    setTimeout(function () {
                        clearInterval(effectId);
                    }, 650);
                }, 1300);
                setTimeout(function () {
                    $('#message').removeClass('effect');
                    $('#splash').addClass('effect2');
                    $('#battle-start').get(0).volume = 0.5;
                    $('#battle-start').get(0).play();
                }, 2000);
                setTimeout(function () {
                    $(battleEnemy[j]).addClass('visible');
                }, 4000);
                setTimeout(function () {
                    $('#battle-start').get(0).pause();
                    $('#battle-start').get(0).currentTime = 0;
                    $('#battle-window').addClass('visible');
                    $('#battle-text').text(enemyName[j] + 'が　あらわれた！')
                    if (enemyName[j] === 'しっこくのきし') {
                        $('#darkknight-bgm').get(0).volume = 0.5;
                        $('#darkknight-bgm').get(0).play();
                    } else {
                        $('#battle-bgm').get(0).volume = 0.5;
                        $('#battle-bgm').get(0).play();
                    }
                }, 5000);
                setTimeout(function () {
                    $('#battle-commands').addClass('appear');
                    $('.hp').addClass('visible');
                    $('.mp').addClass('visible');
                }, 8000);
                enemy = battleEnemy[j];
                name = enemyName[j];
            }
        }
    });

    // 詳細を見た時
    $('#sword-detail').on('click', function () {
        $('#select').get(0).play();
        $('#battle-text').text('こうげきは　あたりにくいが　あたると　きょうりょく');
        setTimeout(function () {
            $('#select').get(0).pause();
            $('#select').get(0).currentTime = 0;
        }, 100);
    });

    $('#magic-detail').on('click', function () {
        $('#select').get(0).play();
        $('#battle-text').text('こうげきは　あたりやすいが　ＭＰを　しょうひする');
        setTimeout(function () {
            $('#select').get(0).pause();
            $('#select').get(0).currentTime = 0;
        }, 100);
    });

    $('#defense-detail').on('click', function () {
        $('#select').get(0).play();
        $('#battle-text').text('こうげきを　ふせぎやすいうえに　ＭＰも　すこし　かいふくする');
        setTimeout(function () {
            $('#select').get(0).pause();
            $('#select').get(0).currentTime = 0;
        }, 100);
    });

    $('#heal-detail').on('click', function () {
        $('#select').get(0).play();
        $('#battle-text').text('ジーズの　ＨＰを　かいふくするが　たまに　ぼうがいされる');
        setTimeout(function () {
            $('#select').get(0).pause();
            $('#select').get(0).currentTime = 0;
        }, 100);
    });

    $('#select').get(0).volume = 0.5;

    // 剣を薙ぎ払った時
    $('#sword').on('click', function () {
        switch (name) {
            case 'しっこくのきし':
                enemyThreshold = 10;
                break;
            case 'みならいのきし':
                enemyThreshold = 6;
                break;
            case 'もりのようせい':
                enemyThreshold = 4;
                break;
            default:
        }

        let randomNumber1 = Math.floor(Math.random() * 3);
        let randomNumber2 = Math.floor(Math.random() * 5);

        $('#select').get(0).play();
        $('#battle-commands').removeClass('appear');
        $('#battle-text').text('ジーズは　けんを　なぎはらった！');
        setTimeout(function () {
            $('#select').get(0).pause();
            $('#select').get(0).currentTime = 0;
        }, 100);

        if (randomNumber1 === 0) {
            if (randomNumber2 === 0) {
                wins += 4;
            } else {
                wins+= 2;
            }
            setTimeout(function () {
                $('#attack').get(0).play();
                $('#sword-effect').addClass('active');
            }, 1000);
            setTimeout(function () {
                $('#attack').get(0).pause();
                $('#attack').get(0).currentTime = 0;
                $('#sword-effect').removeClass('active');
                $(enemy).removeClass('visible');
            }, 1500);
            setTimeout(function () {
                $(enemy).addClass('visible');
            }, 1600);
            setTimeout(function () {
                $(enemy).removeClass('visible');
            }, 1700);
            setTimeout(function () {
                $(enemy).addClass('visible');
                $('#enemy-hp-gauge').css('width', (100 * (enemyThreshold - wins) / enemyThreshold) + '%');
            }, 1800);

            if (randomNumber2 === 0) {
                setTimeout(function () {
                    $('#battle-text').text('こうげきが　めいちゅう！');
                }, 2000);
                setTimeout(function () {
                    $('#battle-text').text('きゅうしょに　あたった！');
                    if (wins >= enemyThreshold || loses >= myThreshold) {
                        result(wins, loses);
                    } else {
                        setTimeout(function () {
                            $('#battle-commands').addClass('appear');
                        }, 2000);
                    }
                }, 4000);

            } else {
                setTimeout(function () {
                    $('#battle-text').text('こうげきが　めいちゅう！');
                    if (wins >= enemyThreshold || loses >= myThreshold) {
                        result(wins, loses);
                    } else {
                        setTimeout(function () {
                            $('#battle-commands').addClass('appear');
                        }, 2000);
                    }
                }, 2000);
            }
        } else if (randomNumber1 === 1) {
            setTimeout(function () {
                $('#dodge').get(0).play();
                $(enemy).addClass('dodge');
            }, 1000);
            setTimeout(function () {
                $(enemy).removeClass('dodge');
            }, 1500);
            setTimeout(function () {
                $('#dodge').get(0).pause();
                $('#dodge').get(0).currentTime = 0;
                $('#battle-text').text('こうげきは　はずれた！');
            }, 2000);
            setTimeout(function () {
                $('#battle-commands').addClass('appear');
            }, 4000);
        } else if (randomNumber1 === 2) {
            loses += 2;
            setTimeout(function () {
                $('#damage').get(0).play();
                $('#damage-effect').addClass('active');
            }, 1000);
            setTimeout(function () {
                $('#damage-effect').removeClass('active');
                $('#my-hp-gauge').css('width', (100 * (myThreshold - loses) / myThreshold) + '%');
            }, 1500);
            setTimeout(function () {
                $('#damage').get(0).pause();
                $('#damage').get(0).currentTime = 0;
                $('#battle-text').text('かえりうちに　あってしまった！');
                if (wins >= enemyThreshold || loses >= myThreshold) {
                    result(wins, loses);
                } else {
                    setTimeout(function () {
                        $('#battle-commands').addClass('appear');
                    }, 2000);
                }
            }, 2000);
        } else {
            alert('エラー！');
        }
    });

    // 呪文を唱えた時
    $('#magic').on('click', function () {
        switch (name) {
            case 'しっこくのきし':
                enemyThreshold = 10;
                break;
            case 'みならいのきし':
                enemyThreshold = 6;
                break;
            case 'もりのようせい':
                enemyThreshold = 4;
                break;
            default:
        }

        mpUse += 2;
        let randomNumber1 = Math.floor(Math.random() * 5);
        let randomNumber2 = Math.floor(Math.random() * 5);

        $('#select').get(0).play();
        $('#battle-commands').removeClass('appear');
        setTimeout(function () {
            $('#select').get(0).pause();
            $('#select').get(0).currentTime = 0;
        }, 100);

        if (myThreshold + 1 <= mpUse) {
            $('#battle-text').text('ＭＰが　たりない！');
            mpUse -= 2;
            setTimeout(function () {
                $('#battle-commands').addClass('appear');
            }, 2000);
        } else {
            $('#my-mp-gauge').css('width', (100 * (myThreshold - mpUse) / myThreshold) + '%');
            $('#battle-text').text('ジーズは　じゅもんを　となえた！');

            if (randomNumber1 === 0 || randomNumber1 === 1 || randomNumber1 === 2) {
                if (randomNumber2 === 0) {
                    wins += 2;
                } else {
                    wins++;
                }
                setTimeout(function () {
                    $('#magic-attack').get(0).play();
                    $('#magic-effect').addClass('active');
                }, 1000);
                setTimeout(function () {
                    $('#magic-attack').get(0).pause();
                    $('#magic-attack').get(0).currentTime = 0;
                    $('#magic-effect').removeClass('active');
                    $(enemy).removeClass('visible');
                }, 1500);
                setTimeout(function () {
                    $(enemy).addClass('visible');
                }, 1600);
                setTimeout(function () {
                    $(enemy).removeClass('visible');
                }, 1700);
                setTimeout(function () {
                    $(enemy).addClass('visible');
                    $('#enemy-hp-gauge').css('width', (100 * (enemyThreshold - wins) / enemyThreshold) + '%');
                }, 1800);
                if (randomNumber2 === 0) {
                    setTimeout(function () {
                        $('#battle-text').text('こうげきが　めいちゅう！');
                    }, 2000);
                    setTimeout(function () {
                        $('#battle-text').text('きゅうしょに　あたった！');
                        if (wins >= enemyThreshold || loses >= myThreshold) {
                            result(wins, loses);
                        } else {
                            setTimeout(function () {
                                $('#battle-commands').addClass('appear');
                            }, 2000);
                        }
                    }, 4000);
                } else {
                    setTimeout(function () {
                        $('#battle-text').text('こうげきが　めいちゅう！');
                        if (wins >= enemyThreshold || loses >= myThreshold) {
                            result(wins, loses);
                        } else {
                            setTimeout(function () {
                                $('#battle-commands').addClass('appear');
                            }, 2000);
                        }
                    }, 2000);
                }
            } else if (randomNumber1 === 3) {
                setTimeout(function () {
                    $('#dodge').get(0).play();
                    $(enemy).addClass('dodge');
                }, 1000);
                setTimeout(function () {
                    $('#dodge').get(0).pause();
                    $('#dodge').get(0).currentTime = 0;
                    $(enemy).removeClass('dodge');
                }, 1500);
                setTimeout(function () {
                    $('#battle-text').text('こうげきは　はずれた！');
                }, 2000);
                setTimeout(function () {
                    $('#battle-commands').addClass('appear');
                }, 4000);
            } else if (randomNumber1 === 4) {
                loses++;
                setTimeout(function () {
                    $('#damage').get(0).play();
                    $('#damage-effect').addClass('active');
                }, 1000);
                setTimeout(function () {
                    $('#damage').get(0).pause();
                    $('#damage').get(0).currentTime = 0;
                    $('#damage-effect').removeClass('active');
                    $('#my-hp-gauge').css('width', (100 * (myThreshold - loses) / myThreshold) + '%');
                }, 1500);
                setTimeout(function () {
                    $('#battle-text').text('かえりうちに　あってしまった！');
                    if (wins >= enemyThreshold || loses >= myThreshold) {
                        result(wins, loses);
                    } else {
                        setTimeout(function () {
                            $('#battle-commands').addClass('appear');
                        }, 2000);
                    }
                }, 2000);
            } else {
                alert('エラー！');
            }
        }
    });

    // 盾を構えた時
    $('#defense').on('click', function () {
        switch (name) {
            case 'しっこくのきし':
                enemyThreshold = 10;
                break;
            case 'みならいのきし':
                enemyThreshold = 6;
                break;
            case 'もりのようせい':
                enemyThreshold = 4;
                break;
            default:
        }

        let randomNumber1 = Math.floor(Math.random() * 5);
        let randomNumber2 = Math.floor(Math.random() * 5);

        if (mpUse > 0) {
            mpUse -= 1;
            $('#my-mp-gauge').css('width', (100 * (myThreshold - mpUse) / myThreshold) + '%');
        }

        $('#select').get(0).play();
        $('#battle-commands').removeClass('appear');
        $('#battle-text').text('ジーズは　たてを　かまえた！');
        setTimeout(function () {
            $('#select').get(0).pause();
            $('#select').get(0).currentTime = 0;
        }, 100);


        if (randomNumber1 === 0) {
            if (randomNumber2 === 0) {
                wins += 2;
            } else {
                wins++;
            }
            setTimeout(function () {
                $('#magic').get(0).play();
                $('#magic-effect').addClass('reflect');
            }, 1000);
            setTimeout(function () {
                $('#magic').get(0).pause();
                $('#magic').get(0).currentTime = 0;
                $('#magic-effect').removeClass('reflect');
                $(enemy).removeClass('visible');
            }, 1500);
            setTimeout(function () {
                $(enemy).addClass('visible');
            }, 1600);
            setTimeout(function () {
                $(enemy).removeClass('visible');
            }, 1700);
            setTimeout(function () {
                $(enemy).addClass('visible');
                $('#enemy-hp-gauge').css('width', (100 * (enemyThreshold - wins) / enemyThreshold) + '%');
            }, 1800);
            if (randomNumber2 === 0) {
                setTimeout(function () {
                    $('#battle-text').text(`たてが　${name}の　じゅもんを　はじきかえした！`);
                }, 2000);
                setTimeout(function () {
                    $('#battle-text').text('きゅうしょに　あたった！');
                    if (wins >= enemyThreshold || loses >= myThreshold) {
                        result(wins, loses);
                    } else {
                        setTimeout(function () {
                            $('#battle-commands').addClass('appear');
                        }, 2000);
                    }
                }, 4000);
            } else {
                setTimeout(function () {
                    $('#battle-text').text(`たてが　${name}の　じゅもんを　はじきかえした！`);
                    if (wins >= enemyThreshold || loses >= myThreshold) {
                        result(wins, loses);
                    } else {
                        setTimeout(function () {
                            $('#battle-commands').addClass('appear');
                        }, 2000);
                    }
                }, 2000);
            }
        } else if (randomNumber1 === 1 || randomNumber1 === 2 || randomNumber1 === 3) {
            setTimeout(function () {
                $('#reflect').get(0).play();
                $(enemy).addClass('guard');
            }, 1000);
            setTimeout(function () {
                $('#reflect').get(0).pause();
                $('#reflect').get(0).currentTime = 0;
                $(enemy).removeClass('guard');
            }, 1500);
            setTimeout(function () {
                $('#battle-text').text('こうげきを　たてで　うけとめた！');
            }, 2000);
            setTimeout(function () {
                $('#battle-commands').addClass('appear');
            }, 4000);
        } else if (randomNumber1 === 4) {
            loses += 0.5;
            setTimeout(function () {
                $('#damage').get(0).play();
                $('#damage-effect').addClass('active');
            }, 1000);
            setTimeout(function () {
                $('#damage').get(0).pause();
                $('#damage').get(0).currentTime = 0;
                $('#damage-effect').removeClass('active');
                $('#my-hp-gauge').css('width', (100 * (myThreshold - loses) / myThreshold) + '%');
            }, 1500);
            setTimeout(function () {
                $('#battle-text').text('たてで　うけそこねてしまった！');
                if (wins >= enemyThreshold || loses >= myThreshold) {
                    result(wins, loses);
                } else {
                    setTimeout(function () {
                        $('#battle-commands').addClass('appear');
                    }, 2000);
                }
            }, 2000);
        } else {
            alert('エラー！');
        }
    });

    // 回復した時
    $('#heal').on('click', function () {
        let randomNumber1 = Math.floor(Math.random() * 7);

        $('#select').get(0).play();
        $('#battle-commands').removeClass('appear');
        $('#battle-text').text('ジーズは　かいふくを　こころみた！');
        setTimeout(function () {
            $('#select').get(0).pause();
            $('#select').get(0).currentTime = 0;
        }, 100);

        if (randomNumber1 === 0 || randomNumber1 === 1 || randomNumber1 === 2 || randomNumber1 ===3 || randomNumber1 === 4) {
            loses -= 2;
            if (loses < 0) {
                loses = 0;
            }
            setTimeout(function () {
                $('#kaifuku').get(0).play();
                $('#heal-effect1').addClass('active');
                $('#heal-effect2').addClass('active');
                $('#heal-effect3').addClass('active');
            }, 1000);
            setTimeout(function () {
                $('#kaifuku').get(0).pause();
                $('#kaifuku').get(0).currentTime = 0;
                $('#heal-effect1').removeClass('active');
                $('#heal-effect2').removeClass('active');
                $('#heal-effect3').removeClass('active');
            }, 1500);
            setTimeout(function () {
                $('#battle-text').text('ジーズの　ＨＰが　かいふくした！');
                $('#my-hp-gauge').css('width', (100 * (myThreshold - loses) / myThreshold) + '%');
            }, 2000);
            setTimeout(function () {
                $('#battle-commands').addClass('appear');
            }, 4000);

        } else if (randomNumber1 === 5) {
            setTimeout(function () {
                $('#reflect').get(0).play();
                $(enemy).addClass('guard');
            }, 1000);
            setTimeout(function () {
                $('#reflect').get(0).pause();
                $('#reflect').get(0).currentTime = 0;
                $(enemy).removeClass('guard');
            }, 1500);
            setTimeout(function () {
                $('#battle-text').text(`${name}に　かいふくを　ぼうがいされた！`);
            }, 2000);
            setTimeout(function () {
                $('#battle-commands').addClass('appear');
            }, 4000);
        } else if (randomNumber1 === 6) {
            loses ++;
            setTimeout(function () {
                $('#damage').get(0).play();
                $('#damage-effect').addClass('active');
            }, 1000);
            setTimeout(function () {
                $('#damage').get(0).pause();
                $('#damage').get(0).currentTime = 0;
                $('#damage-effect').removeClass('active');
                $('#my-hp-gauge').css('width', (100 * (myThreshold - loses) / myThreshold) + '%');
            }, 1500);
            setTimeout(function () {
                $('#battle-text').text('すきを　つかれて　きずを　おった！');
                if (wins >= enemyThreshold || loses >= myThreshold) {
                    result(wins, loses);
                } else {
                    setTimeout(function () {
                        $('#battle-commands').addClass('appear');
                    }, 2000);
                }
            }, 2000);
        } else {
            alert('エラー！');
        }
    });

    function result(wins, loses) {
        console.log(`wins: ${wins}`);
        console.log(`loses: ${loses}`);

        if (wins >= enemyThreshold) {
            $('#disappear').get(0).play();
            let timerId1 = setInterval( ()=>{
                // ボリュームが0になったら終了
                if( ($('#battle-bgm').get(0).volume - 0.1) <= 0 ){
                    $('#battle-bgm').get(0).volume = 0;
                    $('#battle-bgm').get(0).pause();
                    $('#battle-bgm').get(0).currentTime = 0;
                    clearInterval(timerId1);  //タイマー解除
                }
                // 0.1ずつボリュームを減らしていく
                else{
                    $('#battle-bgm').get(0).volume -= 0.1;
                }
            }, 400);
            let timerId2 = setInterval( ()=>{
                // ボリュームが0になったら終了
                if( ($('#darkknight-bgm').get(0).volume - 0.1) <= 0 ){
                    $('#darkknight-bgm').get(0).volume = 0;
                    $('#darkknight-bgm').get(0).pause();
                    $('#darkknight-bgm').get(0).currentTime = 0;
                    clearInterval(timerId2);  //タイマー解除
                }
                // 0.1ずつボリュームを減らしていく
                else{
                    $('#darkknight-bgm').get(0).volume -= 0.1;
                }
            }, 400);
            if (name === 'しっこくのきし') {
                $('#battle-monster').removeClass('visible');
                $('#monster').remove();
                ySymbol[1] = 0;
                xSymbol[1] = 0;
            } else if (name === 'みならいのきし') {
                $('#battle-human').removeClass('visible');
                $('#human').remove();
                ySymbol[2] = 0;
                xSymbol[2] = 0;
            } else if (name === 'もりのようせい') {
                $('#battle-fairy').removeClass('visible');
                $('#fairy').remove();
                ySymbol[3] = 0;
                xSymbol[3] = 0;
            }
            setTimeout(function () {
                $('#disappear').get(0).pause();
                $('#disappear').get(0).currentTime = 0;
                $('#beat').get(0).play();
                $('#battle-text').text(`${name}を　たおした！`);
                $('#battle-commands').removeClass('appear');
            }, 2000);
            setTimeout(function () {
                $('#arrows').addClass('active');
                $('#beat').get(0).pause();
                $('#beat').get(0).currentTime = 0;
                $('#battle-bgm').get(0).volume = 0.5;
                $('#field-bgm').get(0).volume = 1;
                $('#field-bgm').get(0).play();
                $('#splash').removeClass('effect2');
                $('#message').removeClass('encount');
                $('#battle-window').removeClass('visible');
                $('.hp').removeClass('visible');
                $('.mp').removeClass('visible');
                $('#left-black').removeClass('sideblack');
                $('#right-black').removeClass('sideblack');

                wins = 0;
            }, 4000);
            setTimeout(function () {
                $('#enemy-hp-gauge').css('width', (100 * (enemyThreshold - wins) / enemyThreshold) + '%');
                if ($('.icon').length === 0) {
                    finish();
                    let timerId = setInterval( ()=>{
                        // ボリュームが0になったら終了
                        if( ($('#field-bgm').get(0).volume - 0.1) <= 0 ){
                            $('#field-bgm').get(0).volume = 0;
                            $('#field-bgm').get(0).pause();
                            $('#field-bgm').get(0).currentTime = 0;
                            clearInterval(timerId);  //タイマー解除
                        }
                        // 0.1ずつボリュームを減らしていく
                        else{
                            $('#field-bgm').get(0).volume -= 0.1;
                        }
                    }, 200);
                    setTimeout(function () {
                        $('#ending').addClass('visible');
                        $('#ending-bgm').get(0).play();
                    }, 4000);
                    setTimeout(function () {
                        $('#ending').addClass('slide');
                    }, 6000);
                    setTimeout(function () {
                        $('#celebrate').addClass('visible');
                    }, 36000);
                    // 処理後、改めて入力キー配列をリセット
                    input_cmd = [];
                }
            }, 5000);
        } else if (loses >= myThreshold) {
            setTimeout(function () {
            $('#battle-text').text(`${name}に　たおされてしまった`);
                $('#battle-commands').removeClass('appear');
            }, 2000);
            setTimeout(function () {
            $('#retry').addClass('appear');
            }, 4000);

        }
    }

    $('#retry').on('click', function () {
        location.reload();
    });

    function move1(pY, pX) {
        ySymbol[0] += pY;
        xSymbol[0] += pX;
        if (ySymbol[0] < 0 || ySymbol[0] > window.innerHeight - 48 || xSymbol[0] < 0 || xSymbol[0] > window.innerWidth -38) {
            $('#chara').addClass('vibration');
            ySymbol[0] -= pY;
            xSymbol[0] -= pX;
            setTimeout(function() {
                $('#chara').removeClass('vibration');
            }, 300);
        } else {
            $("#chara").animate({
                'top': ySymbol[0] + 'px',
                'left': xSymbol[0] + 'px'
            });
        }
    }

    function move(pY, pX, y, x, id) {
        switch (id) {
            case '#monster':
                y += pY;
                x += pX;
                if (y < 0 || y > window.innerHeight - 50 || x < 0 || x > window.innerWidth - 66) {
                    $('#monster').addClass('vibration');
                    y -= pY;
                    x -= pX;
                    setTimeout(function () {
                        $('#monster').removeClass('vibration');
                    }, 300);
                    return ySymbol[1] = y, xSymbol[1] = x;
                } else {
                    $('#monster').animate({
                        'top': y + 'px',
                        'left': x + 'px'
                    });
                    return ySymbol[1] = y, xSymbol[1] = x;
                }
            case '#human':
                y += pY;
                x += pX;
                if (y < 0 || y > window.innerHeight - 50 || x < 0 || x > window.innerWidth - 66) {
                    $('#human').addClass('vibration');
                    y -= pY;
                    x -= pX;
                    setTimeout(function () {
                        $('#human').removeClass('vibration');
                    }, 300);
                    return ySymbol[2] = y, xSymbol[2] = x;
                } else {
                    $('#human').animate({
                        'top': y + 'px',
                        'left': x + 'px'
                    });
                    return ySymbol[2] = y, xSymbol[2] = x;
                }
            case '#fairy':
                y += pY;
                x += pX;
                if (y < 0 || y > window.innerHeight - 50 || x < 0 || x > window.innerWidth - 66) {
                    $('#fairy').addClass('vibration');
                    y -= pY;
                    x -= pX;
                    setTimeout(function () {
                        $('#fairy').removeClass('vibration');
                    }, 300);
                    return ySymbol[3] = y, xSymbol[3] = x;
                } else {
                    $('#fairy').animate({
                        'top': y + 'px',
                        'left': x + 'px'
                    });
                    return ySymbol[3] = y, xSymbol[3] = x;
                }
            default:
        }
    }

    function finish() {
        $('#finish').addClass('visible');
    }
});