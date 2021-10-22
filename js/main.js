$(function () {
    let yChara = 320;
    let xChara = 1400;
    let yMonster = 240;
    let xMonster = 960;
    let yHuman = 480;
    let xHuman = 1200;
    let yFairy = 720;
    let xFairy = 1440;
    let dis = 36;
    let enemy = '';
    let wins = 0;
    let loses = 0;
    let mpUse = 0;
    let enemyThreshold = 0;
    const myThreshold = 10;
    let input_cmd = [];
    let correct_cmd = [70, 73, 78, 73, 83, 72, 69, 68, 13];

    $(window).ready(function () {
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
    });

    $(document).on('keyup', function (e) {
        console.log("キーコード：" + e.keyCode);

        let randomNumber1 = Math.floor(Math.random() * 4);
        let randomNumber4 = Math.floor(Math.random() * 4);
        let randomNumber5 = Math.floor(Math.random() * 4);

        if (Math.sqrt((Math.abs((yChara + 24) - (yMonster + 38)) ** 2) + (Math.abs((xChara + 19) - (xMonster + 45)) ** 2)) <= 72 ||
            Math.sqrt((Math.abs((yChara + 24) - (yHuman + 24)) ** 2) + (Math.abs((xChara + 19) - (xHuman + 19)) ** 2)) <= 48 ||
            Math.sqrt((Math.abs((yChara + 24) - (yFairy + 24)) ** 2) + (Math.abs((xChara + 19) - (xFairy + 19)) ** 2)) <= 48) {
            return false;
        }

        switch (e.keyCode) {
            case 38: // ↑
                $('#chara4').addClass('now-direction');
                $('#chara1').removeClass('now-direction');
                $('#chara2').removeClass('now-direction');
                $('#chara3').removeClass('now-direction');
                move(-dis, 0);
                break;
            case 37: // ←
                $('#chara2').addClass('now-direction');
                $('#chara1').removeClass('now-direction');
                $('#chara4').removeClass('now-direction');
                $('#chara3').removeClass('now-direction');
                move(0, -dis);
                break;
            case 39: // →
                $('#chara3').addClass('now-direction');
                $('#chara1').removeClass('now-direction');
                $('#chara4').removeClass('now-direction');
                $('#chara2').removeClass('now-direction');
                move(0, dis);
                break;
            case 40: // ↓
                $('#chara1').addClass('now-direction');
                $('#chara3').removeClass('now-direction');
                $('#chara2').removeClass('now-direction');
                $('#chara4').removeClass('now-direction');
                move(dis, 0);
                break;
            default:
        }
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            if (randomNumber1 === 0) {
                $('#monster4').addClass('now-direction');
                $('#monster1').removeClass('now-direction');
                $('#monster2').removeClass('now-direction');
                $('#monster3').removeClass('now-direction');
                move2(-dis, 0);
            } else if (randomNumber1 === 1) {
                $('#monster2').addClass('now-direction');
                $('#monster1').removeClass('now-direction');
                $('#monster4').removeClass('now-direction');
                $('#monster3').removeClass('now-direction');
                move2(0, -dis);
            } else if (randomNumber1 === 2) {
                $('#monster3').addClass('now-direction');
                $('#monster1').removeClass('now-direction');
                $('#monster2').removeClass('now-direction');
                $('#monster4').removeClass('now-direction');
                move2(0, dis);
            } else if (randomNumber1 === 3) {
                $('#monster1').addClass('now-direction');
                $('#monster4').removeClass('now-direction');
                $('#monster2').removeClass('now-direction');
                $('#monster3').removeClass('now-direction');
                move2(dis, 0);
            } else {
                alert('Error!');
            }
        }

        if (e.keyCode >= 37 && e.keyCode <= 40) {
            if (randomNumber4 === 0) {
                $('#human4').addClass('now-direction');
                $('#human1').removeClass('now-direction');
                $('#human2').removeClass('now-direction');
                $('#human3').removeClass('now-direction');
                move3(-dis, 0);
            } else if (randomNumber4 === 1) {
                $('#human2').addClass('now-direction');
                $('#human1').removeClass('now-direction');
                $('#human4').removeClass('now-direction');
                $('#human3').removeClass('now-direction');
                move3(0, -dis);
            } else if (randomNumber4 === 2) {
                $('#human3').addClass('now-direction');
                $('#human1').removeClass('now-direction');
                $('#human2').removeClass('now-direction');
                $('#human4').removeClass('now-direction');
                move3(0, dis);
            } else if (randomNumber4 === 3) {
                $('#human1').addClass('now-direction');
                $('#human4').removeClass('now-direction');
                $('#human2').removeClass('now-direction');
                $('#human3').removeClass('now-direction');
                move3(dis, 0);
            } else {
                alert('Error!');
            }
        }

        if (e.keyCode >= 37 && e.keyCode <= 40) {
            if (randomNumber5 === 0) {
                $('#fairy4').addClass('now-direction');
                $('#fairy1').removeClass('now-direction');
                $('#fairy2').removeClass('now-direction');
                $('#fairy3').removeClass('now-direction');
                move4(-dis, 0);
            } else if (randomNumber5 === 1) {
                $('#fairy2').addClass('now-direction');
                $('#fairy1').removeClass('now-direction');
                $('#fairy4').removeClass('now-direction');
                $('#fairy3').removeClass('now-direction');
                move4(0, -dis);
            } else if (randomNumber5 === 2) {
                $('#fairy3').addClass('now-direction');
                $('#fairy1').removeClass('now-direction');
                $('#fairy2').removeClass('now-direction');
                $('#fairy4').removeClass('now-direction');
                move4(0, dis);
            } else if (randomNumber5 === 3) {
                $('#fairy1').addClass('now-direction');
                $('#fairy4').removeClass('now-direction');
                $('#fairy2').removeClass('now-direction');
                $('#fairy3').removeClass('now-direction');
                move4(dis, 0);
            } else {
                alert('Error!');
            }
        }

        if (Math.sqrt((Math.abs((yChara + 24) - (yMonster + 38)) ** 2) + (Math.abs((xChara + 19) - (xMonster + 45)) ** 2)) <= 72) {
            enemy = 'しっこくのきし';
            wins = 0;
            setTimeout(function () {
                $('#message').addClass('encount');
                $('#left-black').addClass('sideblack')
                $('#right-black').addClass('sideblack')
            }, 300);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1300);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1350);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1400);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1450);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1500);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1550);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1600);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1650);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1700);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1750);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1800);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1850);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1900);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1950);
            setTimeout(function () {
                $('#message').removeClass('effect');
                $('#splash').addClass('effect2');
            }, 2000);
            setTimeout(function () {
                $('#battle-monster').addClass('visible');
            }, 4000);
            setTimeout(function () {
                $('#battle-window').addClass('visible');
                $('#battle-text').text(`${enemy}が　あらわれた！`)
            }, 5000);
            setTimeout(function () {
                $('#battle-commands').addClass('appear');
                $('.hp').addClass('visible');
                $('.mp').addClass('visible');
            }, 8000);
        }

        if (Math.sqrt((Math.abs((yChara + 24) - (yHuman + 24)) ** 2) + (Math.abs((xChara + 19) - (xHuman + 19)) ** 2)) <= 48) {
            enemy = 'みならいのきし'
            wins = 0;
            setTimeout(function () {
                $('#message').addClass('encount');
                $('#left-black').addClass('sideblack')
                $('#right-black').addClass('sideblack')
            }, 300);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1300);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1350);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1400);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1450);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1500);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1550);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1600);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1650);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1700);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1750);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1800);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1850);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1900);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1950);
            setTimeout(function () {
                $('#message').removeClass('effect');
                $('#splash').addClass('effect2');
            }, 2000);
            setTimeout(function () {
                $('#battle-human').addClass('visible');
            }, 4000);
            setTimeout(function () {
                $('#battle-window').addClass('visible');
                $('#battle-text').text(`${enemy}が　あらわれた！`)
            }, 5000);
            setTimeout(function () {
                $('#battle-commands').addClass('appear');
                $('.hp').addClass('visible');
                $('.mp').addClass('visible');
            }, 8000);
        }

        if (Math.sqrt((Math.abs((yChara + 24) - (yFairy + 24)) ** 2) + (Math.abs((xChara + 19) - (xFairy + 19)) ** 2)) <= 48) {
            enemy = 'もりのようせい'
            wins = 0;
            setTimeout(function () {
                $('#message').addClass('encount');
                $('#left-black').addClass('sideblack')
                $('#right-black').addClass('sideblack')
            }, 300);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1300);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1350);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1400);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1450);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1500);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1550);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1600);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1650);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1700);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1750);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1800);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1850);
            setTimeout(function () {
                $('#message').removeClass('effect');
            }, 1900);
            setTimeout(function () {
                $('#message').addClass('effect');
            }, 1950);
            setTimeout(function () {
                $('#message').removeClass('effect');
                $('#splash').addClass('effect2');
            }, 2000);
            setTimeout(function () {
                $('#battle-fairy').addClass('visible');
            }, 4000);
            setTimeout(function () {
                $('#battle-window').addClass('visible');
                $('#battle-text').text(`${enemy}が　あらわれた！`)
            }, 5000);
            setTimeout(function () {
                $('#battle-commands').addClass('appear');
                $('.hp').addClass('visible');
                $('.mp').addClass('visible');
            }, 8000);
        }

        // // 入力されたキーコードを入力キー配列へ追加
        // input_cmd.push(e.keyCode);

        // console.log(input_cmd[input_cmd.length - 1]);
        // console.log(correct_cmd[input_cmd.length - 1]);
        // // コマンド入力
        // if (input_cmd[input_cmd.length - 1] != correct_cmd[input_cmd.length - 1]) {
        //     // 入力を間違えた場合、入力キー配列をリセット（最初からやり直し）
        //     console.log('wrong command!');
        //     input_cmd = [];
        // }
        // // 全ての入力コマンドが合致したら処理を発動
        // else if (input_cmd.length == correct_cmd.length) {
        //     // コナミコマンドによる処理実行！
        //     finish();
        //     setTimeout(function () {
        //         $('#ending').addClass('visible');
        //     }, 4000);
        //     setTimeout(function () {
        //         $('#ending').addClass('slide');
        //     }, 6000);
        //     setTimeout(function () {
        //         $('#celebrate').addClass('visible');
        //     }, 36000);
        //     // 処理後、改めて入力キー配列をリセット
        //     input_cmd = [];
        // } else {

        // }

    });

    // 詳細を見た時
    $('#sword-detail').on('click', function () {
        $('#battle-text').text('こうげきは　あたりにくいが　あたると　きょうりょく');
    });

    $('#magic-detail').on('click', function () {
        $('#battle-text').text('こうげきは　あたりやすいが　ダメージは　すくなめ');
    });

    $('#defense-detail').on('click', function () {
        $('#battle-text').text('こうげきを　ふせぎやすいうえに　うける　ダメージも　とても　すくない');
    });

    $('#heal-detail').on('click', function () {
        $('#battle-text').text('ジーズの　ＨＰを　かいふくするが　たまに　ぼうがいされる');
    });

    // 剣を薙ぎ払った時
    $('#sword').on('click', function () {
        if (enemy === 'しっこくのきし') {
            enemyThreshold = 10;
        } else if (enemy === 'みならいのきし') {
            enemyThreshold = 6;
        } else if (enemy === 'もりのようせい') {
            enemyThreshold = 4;
        }

        let randomNumber2 = Math.floor(Math.random() * 3);
        let randomNumber3 = Math.floor(Math.random() * 5);

        $('#battle-commands').removeClass('appear');
        $('#battle-text').text('ジーズは　けんを　なぎはらった！');

        if (randomNumber2 === 0) {
            if (randomNumber3 === 0) {
                wins += 4;
            } else {
                wins+= 2;
            }
            setTimeout(function () {
                $('#sword-effect').addClass('active');
            }, 1000);
            setTimeout(function () {
                $('#sword-effect').removeClass('active');
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').removeClass('visible');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').removeClass('visible');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').removeClass('visible');
                }
            }, 1500);
            setTimeout(function () {
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').addClass('visible');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').addClass('visible');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').addClass('visible');
                }
            }, 1600);
            setTimeout(function () {
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').removeClass('visible');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').removeClass('visible');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').removeClass('visible');
                }
            }, 1700);
            setTimeout(function () {
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').addClass('visible');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').addClass('visible');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').addClass('visible');
                }
                $('#enemy-hp-gauge').css('width', (100 * (enemyThreshold - wins) / enemyThreshold) + '%');
            }, 1800);

            if (randomNumber3 === 0) {
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
        } else if (randomNumber2 === 1) {
            setTimeout(function () {
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').addClass('dodge');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').addClass('dodge');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').addClass('dodge');
                }
            }, 1000);
            setTimeout(function () {
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').removeClass('dodge');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').removeClass('dodge');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').removeClass('dodge');
                }
            }, 1500);
            setTimeout(function () {
                $('#battle-text').text('こうげきは　はずれた！');
            }, 2000);
            setTimeout(function () {
                $('#battle-commands').addClass('appear');
            }, 4000);
        } else if (randomNumber2 === 2) {
            loses += 2;
            setTimeout(function () {
                $('#damage-effect').addClass('active');
            }, 1000);
            setTimeout(function () {
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
    });

    // 呪文を唱えた時
    $('#magic').on('click', function () {
        if (enemy === 'しっこくのきし') {
            enemyThreshold = 10;
        } else if (enemy === 'みならいのきし') {
            enemyThreshold = 6;
        } else if (enemy === 'もりのようせい') {
            enemyThreshold = 4;
        }

        mpUse += 2;
        let randomNumber2 = Math.floor(Math.random() * 5);
        let randomNumber3 = Math.floor(Math.random() * 5);

        $('#my-mp-gauge').css('width', (100 * (myThreshold - mpUse) / myThreshold) + '%');
        $('#battle-commands').removeClass('appear');

        if (myThreshold < mpUse) {
            $('#battle-text').text('ＭＰが　たりない！');
            setTimeout(function () {
                $('#battle-commands').addClass('appear');
            }, 2000);
        } else {
            $('#battle-text').text('ジーズは　じゅもんを　となえた！');

            if (randomNumber2 === 0 || randomNumber2 === 1 || randomNumber2 === 2) {
                if (randomNumber3 === 0) {
                    wins += 2;
                } else {
                    wins++;
                }
                setTimeout(function () {
                    $('#magic-effect').addClass('active');
                }, 1000);
                setTimeout(function () {
                    $('#magic-effect').removeClass('active');
                    if (enemy === 'しっこくのきし') {
                        $('#battle-monster').removeClass('visible');
                    } else if (enemy === 'みならいのきし') {
                        $('#battle-human').removeClass('visible');
                    } else if (enemy === 'もりのようせい') {
                        $('#battle-fairy').removeClass('visible');
                    }
                }, 1500);
                setTimeout(function () {
                    if (enemy === 'しっこくのきし') {
                        $('#battle-monster').addClass('visible');
                    } else if (enemy === 'みならいのきし') {
                        $('#battle-human').addClass('visible');
                    } else if (enemy === 'もりのようせい') {
                        $('#battle-fairy').addClass('visible');
                    }
                }, 1600);
                setTimeout(function () {
                    if (enemy === 'しっこくのきし') {
                        $('#battle-monster').removeClass('visible');
                    } else if (enemy === 'みならいのきし') {
                        $('#battle-human').removeClass('visible');
                    } else if (enemy === 'もりのようせい') {
                        $('#battle-fairy').removeClass('visible');
                    }
                }, 1700);
                setTimeout(function () {
                    if (enemy === 'しっこくのきし') {
                        $('#battle-monster').addClass('visible');
                    } else if (enemy === 'みならいのきし') {
                        $('#battle-human').addClass('visible');
                    } else if (enemy === 'もりのようせい') {
                        $('#battle-fairy').addClass('visible');
                    }
                    $('#enemy-hp-gauge').css('width', (100 * (enemyThreshold - wins) / enemyThreshold) + '%');
                }, 1800);
                if (randomNumber3 === 0) {
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
            } else if (randomNumber2 === 3) {
                setTimeout(function () {
                    if (enemy === 'しっこくのきし') {
                        $('#battle-monster').addClass('dodge');
                    } else if (enemy === 'みならいのきし') {
                        $('#battle-human').addClass('dodge');
                    } else if (enemy === 'もりのようせい') {
                        $('#battle-fairy').addClass('dodge');
                    }
                }, 1000);
                setTimeout(function () {
                    if (enemy === 'しっこくのきし') {
                        $('#battle-monster').removeClass('dodge');
                    } else if (enemy === 'みならいのきし') {
                        $('#battle-human').removeClass('dodge');
                    } else if (enemy === 'もりのようせい') {
                        $('#battle-fairy').removeClass('dodge');
                    }
                }, 1500);
                setTimeout(function () {
                    $('#battle-text').text('こうげきは　はずれた！');
                }, 2000);
                setTimeout(function () {
                    $('#battle-commands').addClass('appear');
                }, 4000);
            } else if (randomNumber2 === 4) {
                loses++;
                setTimeout(function () {
                    $('#damage-effect').addClass('active');
                }, 1000);
                setTimeout(function () {
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
        if (enemy === 'しっこくのきし') {
            enemyThreshold = 10;
        } else if (enemy === 'みならいのきし') {
            enemyThreshold = 6;
        } else if (enemy === 'もりのようせい') {
            enemyThreshold = 4;
        }

        let randomNumber2 = Math.floor(Math.random() * 5);
        let randomNumber3 = Math.floor(Math.random() * 5);

        $('#battle-commands').removeClass('appear');
        $('#battle-text').text('ジーズは　たてを　かまえた！');

        if (randomNumber2 === 0) {
            if (randomNumber3 === 0) {
                wins += 2;
            } else {
                wins++;
            }
            setTimeout(function () {
                $('#magic-effect').addClass('reflect');
            }, 1000);
            setTimeout(function () {
                $('#magic-effect').removeClass('reflect');
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').removeClass('visible');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').removeClass('visible');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').removeClass('visible');
                }
            }, 1500);
            setTimeout(function () {
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').addClass('visible');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').addClass('visible');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').addClass('visible');
                }
            }, 1600);
            setTimeout(function () {
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').removeClass('visible');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').removeClass('visible');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').removeClass('visible');
                }
            }, 1700);
            setTimeout(function () {
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').addClass('visible');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').addClass('visible');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').addClass('visible');
                }
                $('#enemy-hp-gauge').css('width', (100 * (enemyThreshold - wins) / enemyThreshold) + '%');
            }, 1800);
            if (randomNumber3 === 0) {
                setTimeout(function () {
                    $('#battle-text').text(`たてが　${enemy}の　じゅもんを　はじきかえした！`);
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
                    $('#battle-text').text(`たてが　${enemy}の　じゅもんを　はじきかえした！`);
                    if (wins >= enemyThreshold || loses >= myThreshold) {
                        result(wins, loses);
                    } else {
                        setTimeout(function () {
                            $('#battle-commands').addClass('appear');
                        }, 2000);
                    }
                }, 2000);
            }
        } else if (randomNumber2 === 1 || randomNumber2 === 2 || randomNumber2 === 3) {
            setTimeout(function () {
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').addClass('guard');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').addClass('guard');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').addClass('guard');
                }
            }, 1000);
            setTimeout(function () {
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').removeClass('guard');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').removeClass('guard');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').removeClass('guard');
                }
            }, 1500);
            setTimeout(function () {
                $('#battle-text').text('こうげきを　たてで　うけとめた！');
            }, 2000);
            setTimeout(function () {
                $('#battle-commands').addClass('appear');
            }, 4000);
        } else if (randomNumber2 === 4) {
            loses += 0.5;
            setTimeout(function () {
                $('#damage-effect').addClass('active');
            }, 1000);
            setTimeout(function () {
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
        let randomNumber2 = Math.floor(Math.random() * 7);

        $('#battle-commands').removeClass('appear');
        $('#battle-text').text('ジーズは　かいふくを　こころみた！');

        if (randomNumber2 === 0 || randomNumber2 === 1 || randomNumber2 === 2 || randomNumber2 ===3 || randomNumber2 === 4) {
            loses -= 2;
            if (loses < 0) {
                loses = 0;
            }
            setTimeout(function () {
                $('#heal-effect1').addClass('active');
                $('#heal-effect2').addClass('active');
                $('#heal-effect3').addClass('active');
            }, 1000);
            setTimeout(function () {
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

        } else if (randomNumber2 === 5) {
            setTimeout(function () {
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').addClass('guard');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').addClass('guard');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').addClass('guard');
                }
            }, 1000);
            setTimeout(function () {
                if (enemy === 'しっこくのきし') {
                    $('#battle-monster').removeClass('guard');
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').removeClass('guard');
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').removeClass('guard');
                }
            }, 1500);
            setTimeout(function () {
                $('#battle-text').text(`${enemy}に　かいふくを　ぼうがいされた！`);
            }, 2000);
            setTimeout(function () {
                $('#battle-commands').addClass('appear');
            }, 4000);
        } else if (randomNumber2 === 6) {
            loses ++;
            setTimeout(function () {
                $('#damage-effect').addClass('active');
            }, 1000);
            setTimeout(function () {
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
            if (enemy === 'しっこくのきし') {
                    $('#battle-monster').removeClass('visible');
                    $('#monster').remove();
                    yMonster = 0;
                    xMonster = 0;
                } else if (enemy === 'みならいのきし') {
                    $('#battle-human').removeClass('visible');
                    $('#human').remove();
                    yHuman = 0;
                    xHuman = 0;
                } else if (enemy === 'もりのようせい') {
                    $('#battle-fairy').removeClass('visible');
                    $('#fairy').remove();
                    yFairy = 0;
                    xFairy = 0;
                }
            setTimeout(function () {
                $('#battle-text').text(`${enemy}を　たおした！`);
                $('#battle-commands').removeClass('appear');
            }, 2000);
            setTimeout(function () {
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
                }
            }, 5000);
        } else if (loses >= myThreshold) {
            setTimeout(function () {
            $('#battle-text').text(`${enemy}に　たおされてしまった`);
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

    function move(pY, pX) {
        yChara += pY;
        xChara += pX;
        // $('#chara').removeClass('vibration');
        if (yChara < 0 || yChara > window.innerHeight - 48 || xChara < 0 || xChara > window.innerWidth -38) {
            $('#chara').addClass('vibration');
            yChara -= pY;
            xChara -= pX;
            setTimeout(function() {
                $('#chara').removeClass('vibration');
            }, 300);
        } else {
            $("#chara").animate({
                'top': yChara + 'px',
                'left': xChara + 'px'
            });
        }
    }

    function move2(pY, pX) {
        yMonster += pY;
        xMonster += pX;
        // $('#monster').removeClass('vibration');
        if (yMonster < 0 || yMonster > window.innerHeight -50 || xMonster < 0 || xMonster > window.innerWidth -66) {
            $('#monster').addClass('vibration');
            yMonster -= pY;
            xMonster -= pX;
            setTimeout(function() {
                $('#monster').removeClass('vibration');
            }, 300);
        } else {
            $("#monster").animate({
                'top': yMonster + 'px',
                'left': xMonster + 'px'
            });
        }
    }

    function move3(pY, pX) {
        yHuman += pY;
        xHuman += pX;
        // $('#monster').removeClass('vibration');
        if (yHuman < 0 || yHuman > window.innerHeight -50 || xHuman < 0 || xHuman > window.innerWidth -66) {
            $('#human').addClass('vibration');
            yHuman -= pY;
            xHuman -= pX;
            setTimeout(function() {
                $('#human').removeClass('vibration');
            }, 300);
        } else {
            $("#human").animate({
                'top': yHuman + 'px',
                'left': xHuman + 'px'
            });
        }
    }

    function move4(pY, pX) {
        yFairy += pY;
        xFairy += pX;
        // $('#monster').removeClass('vibration');
        if (yFairy < 0 || yFairy > window.innerHeight -50 || xFairy < 0 || xFairy > window.innerWidth -66) {
            $('#fairy').addClass('vibration');
            yFairy -= pY;
            xFairy -= pX;
            setTimeout(function() {
                $('#fairy').removeClass('vibration');
            }, 300);
        } else {
            $("#fairy").animate({
                'top': yFairy + 'px',
                'left': xFairy + 'px'
            });
        }
    }

    function finish() {
        $('#finish').addClass('visible');
    }
});