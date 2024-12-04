"use strict";
(self.webpackChunkng_turbo_games = self.webpackChunkng_turbo_games || []).push([[80], {
    1080: (Re,Z,o)=>{
        o.r(Z),
        o.d(Z, {
            MinesModule: ()=>Be
        });
        var b = o(9808)
          , B = o(3075)
          , W = o(4996)
          , O = o(9039)
          , R = o(6352)
          , j = o(7303)
          , L = o(430)
          , y = o(7582)
          , m = o(4987)
          , D = o(5684)
          , G = o(2805)
          , Q = o(1361)
          , z = o(6652)
          , w = o(8044)
          , P = o(4946)
          , g = o(9082)
          , H = o(4750)
          , a = o(2398)
          , c = (()=>{
            return (s = c || (c = {})).Unrevealed = "unrevealed",
            s.StarRevealed = "star_revealed",
            s.BombRevealed = "bomb_revealed",
            s.StarTriggered = "star_triggered",
            s.BombTriggered = "bomb_triggered",
            s.Selected = "selected",
            s.SelectedBomb = "selected_bomb",
            s.SelectedStar = "selected_star",
            s.Loading = "loading",
            c;
            var s
        }
        )()
          , d = (()=>{
            return (s = d || (d = {})).FlipX = "flip_x",
            s.FlipY = "flip_y",
            d;
            var s
        }
        )()
          , l = (()=>{
            return (s = l || (l = {}))[s.ResetForGame = 1] = "ResetForGame",
            s[s.ResetForAutoplay = 2] = "ResetForAutoplay",
            s[s.BeforeStartGame = 3] = "BeforeStartGame",
            s[s.StartGame = 4] = "StartGame",
            s[s.WaitOpenCell = 5] = "WaitOpenCell",
            s[s.ContinueGame = 6] = "ContinueGame",
            s[s.EndGame = 7] = "EndGame",
            s[s.BeforeCashout = 8] = "BeforeCashout",
            s[s.BeforeAutoplay = 9] = "BeforeAutoplay",
            s[s.ContinueAutoplay = 10] = "ContinueAutoplay",
            l;
            var s
        }
        )();
        const T = s=>s.hasOwnProperty("winAmount") && !s.hasOwnProperty("endGame")
          , N = s=>s.hasOwnProperty("nextTile")
          , A = s=>s.hasOwnProperty("endGame");
        var t = o(7587)
          , v = o(7258)
          , I = o(9300)
          , p = o(7437)
          , V = o(7802)
          , M = o(9892)
          , _ = o(8514);
        class q extends M.W20 {
            constructor(e, n, i) {
                super(),
                this.index = e,
                this.row = n,
                this.column = i,
                this.view = new M.W20,
                this.viewFrames = {},
                Object.values(c).forEach(k=>this.createState(k, !1)),
                this.addChild(this.view),
                this.setState(c.Unrevealed).then();
                const h = n - 1
                  , F = this.height / 2;
                this.x = (i - 1) * (this.width + 7) + this.width / 2,
                this.y = h * (this.height + 6) + F,
                this.buttonMode = !0,
                this.interactive = !0
            }
            get activeState() {
                return this._activeState
            }
            setState(e, n, i=.3) {
                return new Promise(r=>{
                    if (this._activeState === e)
                        return void r();
                    this._activeState = e;
                    const h = "slow(0.7, 0.7, false)";
                    switch (n) {
                    case d.FlipX:
                        _.J.tween(this.view.scale, i / 2, {
                            x: 0,
                            flipEase: h
                        }).then(()=>{
                            this.hideAll(),
                            this.getState(e).visible = !0,
                            _.J.tween(this.view.scale, i / 2, {
                                x: 1,
                                flipEase: h
                            }).then(()=>r())
                        }
                        );
                        break;
                    case d.FlipY:
                        _.J.tween(this.view.scale, i / 2, {
                            y: 0,
                            flipEase: h
                        }).then(()=>{
                            this.hideAll(),
                            this.getState(e).visible = !0,
                            _.J.tween(this.view.scale, i / 2, {
                                y: 1,
                                flipEase: h
                            }).then(()=>r())
                        }
                        );
                        break;
                    default:
                        this.hideAll(),
                        this.getState(e).visible = !0,
                        r()
                    }
                }
                )
            }
            getState(e) {
                return this.viewFrames[e]
            }
            hideAll() {
                Object.values(this.viewFrames).forEach(e=>e.visible = !1)
            }
            createState(e, n=!1) {
                let i;
                n ? (i = new M.KgH(M.aNw.shared.resources.mines.spritesheet.animations[`mc_ ${e}`]),
                i.animationSpeed = .1) : i = new M.jyi(M.xEZ.from(`mc_ ${e}`)),
                i.anchor.set(.5, .5),
                i.visible = !1,
                this.view.addChild(i),
                this.viewFrames[e] = i
            }
            resetHover(e=!0) {
                this.view.y = e ? 0 : 2
            }
            disabled(e=!0) {
                this.interactive = !e,
                this.alpha = e ? .7 : 1
            }
            get isDisabled() {
                return !this.interactive
            }
            reset() {
                this.setState(c.Unrevealed).then(),
                this.resetHover()
            }
        }
        const S = .5;
        class ee extends V.f {
            constructor(e, n) {
                super(e, n, !0, {
                    width: 418,
                    height: 324,
                    autoDensity: !1,
                    backgroundAlpha: 0
                }),
                this.cells = [],
                this.isSelectedRevealed = i=>i.activeState === c.SelectedBomb || i.activeState === c.SelectedStar,
                this.createCells(),
                this.disabled()
            }
            getCells(e=null) {
                return null === e ? this.cells : this.cells.filter(n=>n.activeState === e)
            }
            disabled(e=!0) {
                this.cells.forEach(n=>n.disabled(e))
            }
            createCells() {
                let e = 1;
                for (let n = 0; n < 5; n++)
                    for (let i = 0; i < 5; i++) {
                        const u = new q(e,n + 1,i + 1);
                        u.on("pointertap", x=>this.emitEvent("onClickCell", x)),
                        u.on("pointerover", ()=>this.emitEvent("onOverCell")),
                        this.cells.push(u),
                        this.stage.addChild(u),
                        e++
                    }
            }
            openCell(e, n, i) {
                return this.cells.find(h=>h.row === e && h.column === n).setState(i)
            }
            revealCells(e) {
                const n = [];
                return e.forEach(i=>{
                    const r = this.cells.find(h=>h.row === i.rows && h.column === i.columns);
                    r.activeState === c.Unrevealed ? n.push(r.setState(c.BombRevealed, d.FlipX, S)) : r.activeState === c.Selected && n.push(r.setState(c.SelectedBomb, d.FlipX, S))
                }
                ),
                this.cells.forEach(i=>{
                    i.activeState === c.Unrevealed ? n.push(i.setState(c.StarRevealed, d.FlipX, S)) : i.activeState === c.Selected && n.push(i.setState(c.SelectedStar, d.FlipX, S))
                }
                ),
                Promise.all(n)
            }
            resetCells(e) {
                !Array.isArray(this.cells) || !this.cells.length || this.cells.forEach(n=>{
                    if (e) {
                        const i = this.isSelectedRevealed(n) ? c.Selected : c.Unrevealed;
                        n.setState(i, d.FlipY).then()
                    } else
                        n.reset()
                }
                )
            }
        }
        var te = o(7111)
          , Y = o(2821)
          , J = o(8784)
          , ne = o(9798)
          , se = o(3031)
          , ie = o(7454)
          , oe = o(8855)
          , ae = o(1560);
        const re = ["canvas"];
        function le(s, e) {
            if (1 & s) {
                const n = t.EpF();
                t.TgZ(0, "button", 21),
                t.NdJ("click", function() {
                    const h = t.CHM(n).index
                      , u = t.oxw();
                    return u.onChooseMinesAmount(h + 1),
                    u.soundPlayButtonClick()
                }),
                t._uU(1),
                t.qZA()
            }
            if (2 & s) {
                const n = e.index
                  , i = t.oxw();
                t.Q6J("ngClass", i.getDropdownMenuButtonClasses(n)),
                t.xp6(1),
                t.hij(" ", n + 1, " ")
            }
        }
        function ce(s, e) {
            1 & s && (t.TgZ(0, "span", 23),
            t._uU(1),
            t.ALo(2, "transloco"),
            t.qZA()),
            2 & s && (t.xp6(1),
            t.hij(" ", t.lcZ(2, 1, "shared.Next"), ": "))
        }
        function he(s, e) {
            1 & s && (t.TgZ(0, "span", 23),
            t._uU(1),
            t.ALo(2, "transloco"),
            t.qZA()),
            2 & s && (t.xp6(1),
            t.hij(" ", t.lcZ(2, 1, "shared.Payout"), ": "))
        }
        function me(s, e) {
            if (1 & s && (t.ynx(0),
            t.YNc(1, ce, 3, 3, "span", 22),
            t.YNc(2, he, 3, 3, "span", 22),
            t.TgZ(3, "span"),
            t._uU(4),
            t.ALo(5, "decimalCurrency"),
            t.qZA(),
            t.BQk()),
            2 & s) {
                const n = t.oxw();
                t.xp6(1),
                t.Q6J("ngIf", !n.isAutoplay),
                t.xp6(1),
                t.Q6J("ngIf", n.isAutoplay),
                t.xp6(2),
                t.AsE(" ", t.lcZ(5, 4, n.payout), " ", n.config.currency, " ")
            }
        }
        function ue(s, e) {
            1 & s && (t.TgZ(0, "span", 23),
            t._uU(1),
            t.ALo(2, "transloco"),
            t.qZA()),
            2 & s && (t.xp6(1),
            t.hij(" ", t.lcZ(2, 1, "shared.Next"), ": "))
        }
        function pe(s, e) {
            if (1 & s && (t.TgZ(0, "span"),
            t._uU(1),
            t.ALo(2, "decimalMultiplier"),
            t.ALo(3, "transloco"),
            t.qZA()),
            2 & s) {
                const n = t.oxw(2);
                t.xp6(1),
                t.AsE(" ", t.lcZ(2, 2, n.maxCoef), "x (", t.lcZ(3, 4, "shared.max"), ") ")
            }
        }
        function de(s, e) {
            if (1 & s && (t.TgZ(0, "span"),
            t._uU(1),
            t.ALo(2, "decimalMultiplier"),
            t.qZA()),
            2 & s) {
                const n = t.oxw(2);
                t.xp6(1),
                t.hij("", t.lcZ(2, 1, n.coefficients), "x")
            }
        }
        function ge(s, e) {
            if (1 & s && (t.ynx(0),
            t.YNc(1, ue, 3, 3, "span", 22),
            t.YNc(2, pe, 4, 6, "span", 24),
            t.ALo(3, "async"),
            t.YNc(4, de, 3, 3, "ng-template", null, 25, t.W1O),
            t.BQk()),
            2 & s) {
                const n = t.MAs(5)
                  , i = t.oxw();
                t.xp6(1),
                t.Q6J("ngIf", !i.isAutoplay || i.isAutoplay && !i.isSelectedMaxCells),
                t.xp6(1),
                t.Q6J("ngIf", i.config.isMaxWinAm && t.lcZ(3, 3, i.maxWinService.isMaxUserWin$))("ngIfElse", n)
            }
        }
        function Ce(s, e) {
            if (1 & s) {
                const n = t.EpF();
                t.TgZ(0, "app-game-mode-toggle", 26),
                t.NdJ("ngModelChange", function() {
                    return t.CHM(n),
                    t.oxw().onToggleAutoPlay()
                }),
                t.qZA()
            }
            if (2 & s) {
                const n = t.oxw();
                t.Q6J("disabled", !n.btnAutoplay || n.isActiveFreeBet)("ngModel", n.isAutoplay)
            }
        }
        const fe = function(s, e, n) {
            return {
                "bg-success": s,
                "bg-warning": e,
                "bg-error": n
            }
        };
        let C = class {
            constructor(e, n, i, r, h) {
                this.sound = e,
                this.core = n,
                this.zone = i,
                this.betControls = r,
                this.maxWinService = h,
                this.minesAmount = this.gameConfig.defaultMinesAmount,
                this.payout = 0,
                this.coefficients = 0,
                this.isAutoplay = !1,
                this.btnAutoplay = !0,
                this.btnNumOfMines = !0,
                this.btnRandom = !1,
                this.numberOfMines = new Array(20).fill(null),
                this.maxMinesCells = 25,
                this.isCellsClickable = !1,
                this.openCell = new t.vpe,
                this.resultDrawComplete = new t.vpe,
                this.autoplayChange = new t.vpe
            }
            ngOnInit() {
                this.minesCanvas = new ee(this.canvas.nativeElement,this.zone),
                this.minesCanvas.events$.pipe((0,
                I.h)(e=>"onClickCell" === e.type), (0,
                m.t)(this)).subscribe(e=>{
                    this.onClickCell(e.data.target)
                }
                ),
                this.minesCanvas.events$.pipe((0,
                I.h)(e=>"onOverCell" === e.type), (0,
                m.t)(this)).subscribe(()=>{
                    this.soundPlayMouseOverMine()
                }
                ),
                this.state = l.ResetForGame,
                this.subscribeUpdateBetAmount(),
                this.subscribeToggleFreebet(),
                this.core.freeBets.onActivate$.pipe((0,
                m.t)(this), (0,
                D.T)(1)).subscribe(()=>{
                    this.isAutoplay = !1
                }
                )
            }
            get gameConfig() {
                return this.core.gameConfig
            }
            get config() {
                return this.core.config
            }
            set state(e) {
                switch (e) {
                case l.ResetForGame:
                    if (this.core.config.isShowLastRoundStateUntilNextRound) {
                        this.isCellsClickable = !1,
                        this.btnNumOfMines = !0,
                        this.btnAutoplay = !0,
                        this.btnRandom = !1;
                        break
                    }
                    this.isCellsClickable = !1,
                    this.btnNumOfMines = !0,
                    this.btnAutoplay = !0,
                    this.btnRandom = !1,
                    this.minesCanvas.resetCells(!1),
                    this.minesCanvas.disabled(!0),
                    this.updatePayout();
                    break;
                case l.ResetForAutoplay:
                    this.isCellsClickable = !0,
                    this.btnNumOfMines = !1,
                    this.btnAutoplay = !0,
                    this.btnRandom = !0,
                    this.minesCanvas.resetCells(!1),
                    this.minesCanvas.disabled(!1),
                    this.updatePayout();
                    break;
                case l.BeforeStartGame:
                    this.isCellsClickable = !1,
                    this.btnNumOfMines = !1,
                    this.btnAutoplay = !1,
                    this.btnRandom = !1,
                    this.minesCanvas.resetCells(!1),
                    this.minesCanvas.disabled(),
                    this.updatePayout();
                    break;
                case l.StartGame:
                    this.isCellsClickable = !0,
                    this.btnRandom = !0,
                    this.minesCanvas.disabled(!1);
                    break;
                case l.WaitOpenCell:
                    this.isCellsClickable = !1,
                    this.btnRandom = !1;
                    break;
                case l.ContinueGame:
                    this.isCellsClickable = !0,
                    this.btnRandom = !0;
                    break;
                case l.EndGame:
                case l.BeforeCashout:
                    this.isCellsClickable = !1,
                    this.btnRandom = !1,
                    this.btnAutoplay = !1,
                    this.btnNumOfMines = !1;
                    break;
                case l.BeforeAutoplay:
                    this.isCellsClickable = !1,
                    this.btnNumOfMines = !1,
                    this.btnAutoplay = !1,
                    this.btnRandom = !1;
                    break;
                case l.ContinueAutoplay:
                    this.minesCanvas.resetCells(!0)
                }
            }
            getDropdownMenuButtonClasses(e) {
                return this.minesAmount === e + 1 ? "gui-bg" : "gui-bg-100"
            }
            setResult(e) {
                if (!N(e))
                    return T(e) ? (this.sound.playSound(p.JR.Win),
                    void this.setResultCashout(e)) : void (A(e) && this.setResultEndGame(e));
                this.setResultGameRunning(e)
            }
            setResultGameRunning(e) {
                var n;
                const i = (null === (n = e.endGame) || void 0 === n ? void 0 : n.mines) || null
                  , r = e.win ? c.StarTriggered : c.BombTriggered
                  , {rows: h, columns: u} = e.openCell;
                this.minesCanvas.openCell(h, u, r).then(()=>{
                    e.win && e.nextTile && !e.endGame ? this.continueGame(e) : (this.sound.playSound(e.win ? p.JR.Win : p.BU.BombDetect),
                    this.endGame(e, i))
                }
                )
            }
            setResultCashout(e) {
                this.endGame(e, e.mines || null)
            }
            setResultEndGame(e) {
                var n;
                const i = (null === (n = e.endGame) || void 0 === n ? void 0 : n.mines) || null;
                this.endGame(e, i)
            }
            continueGame(e) {
                this.state = l.ContinueGame,
                this.payout = e.nextTile,
                this.gameConfig.coefficients ? (this.coefficients = e.nextTile,
                this.maxWinService.profit = v.t.mul(e.nextTile, this.betControls.betAmount).toDP(this.config.betPrecision, v.t.ROUND_DOWN).toNumber()) : this.maxWinService.profit = e.nextTile,
                this.sound.playSound(100 === this.openCellsPercent ? p.JR.Win : p.JR.SoftWin),
                this.resultDrawComplete.emit(e)
            }
            endGame(e, n) {
                this.minesCanvas.revealCells(n).then(()=>{
                    this.isAutoplay && (this.sound.playSound(e.endGame.win ? p.JR.Win : p.BU.BombDetect),
                    (0,
                    G.H)(500).pipe((0,
                    m.t)(this)).subscribe(()=>{
                        this.state = l.ContinueAutoplay,
                        this.resultDrawComplete.emit(e)
                    }
                    )),
                    this.isAutoplay || (this.state = l.EndGame,
                    this.resultDrawComplete.emit(e))
                }
                )
            }
            onClickCell(e) {
                if (this.isCellsClickable) {
                    if (this.isAutoplay) {
                        if (this.isSelectedMaxCells && e.activeState === c.Unrevealed)
                            return;
                        return e.setState(e.activeState === c.Unrevealed ? c.Selected : c.Unrevealed).then(),
                        this.updatePayout(),
                        this.sound.playSound(p.BU.MinesSelect),
                        void this.autoplayChange.emit({
                            enabled: !0,
                            canStart: this.selectedCells.length > 0
                        })
                    }
                    if (e.activeState === c.Unrevealed) {
                        this.state = l.WaitOpenCell;
                        const {row: n, column: i} = e;
                        e.setState(c.Loading).then(),
                        this.openCell.emit({
                            row: n,
                            column: i
                        })
                    }
                }
            }
            onPickRandomly() {
                const e = this.minesCanvas.getCells(c.Unrevealed)
                  , n = Math.floor(Math.random() * e.length);
                this.onClickCell(e[n])
            }
            onToggleAutoPlay() {
                this.sound.playSound(p.JR.Chip),
                this.isAutoplay = !this.isAutoplay,
                this.state = this.isAutoplay ? l.ResetForAutoplay : l.ResetForGame,
                this.autoplayChange.emit({
                    enabled: this.isAutoplay,
                    canStart: !1
                })
            }
            onChooseMinesAmount(e) {
                this.minesCanvas.resetCells(),
                this.minesAmount = e,
                this.updatePayout()
            }
            subscribeToggleFreebet() {
                this.core.freeBets.onActivate$.pipe((0,
                m.t)(this)).subscribe(()=>{
                    this.updatePayout()
                }
                )
            }
            get openCellsPercent() {
                return this.minesCanvas ? 100 * this.minesCanvas.getCells(this.isAutoplay ? c.Selected : c.StarTriggered).length / this.maxStars : 0
            }
            get selectedCells() {
                return this.minesCanvas ? this.minesCanvas.getCells(c.Selected).map(e=>({
                    index: e.index,
                    row: e.row,
                    column: e.column
                })) : []
            }
            get isSelectedMaxCells() {
                return this.selectedCells.length >= this.maxStars
            }
            get maxStars() {
                return this.maxMinesCells - this.minesAmount
            }
            updatePayout() {
                let e = this.selectedCells.length;
                this.gameConfig.coefficients ? (this.isSelectedMaxCells || e++,
                this.coefficients = this.gameConfig.coefficients[this.minesAmount][e - 1]) : this.isAutoplay || e++,
                this.payout = ((s,e,n,i)=>{
                    if (0 === s)
                        return 0;
                    let r = (100 - this.core.config.houseEdge) / 100;
                    for (let h = 0; h < s; h++) {
                        const u = e - h;
                        r *= u / (u - n)
                    }
                    return r
                }
                )(e, this.maxMinesCells, this.minesAmount) * (this.core.freeBets.activeFreeBet ? this.core.freeBets.activeFreeBet.betAmount : this.betControls.betAmount),
                this.maxWinService.profit = this.payout
            }
            get maxCoef() {
                return this.core.freeBets.activeFreeBet ? v.t.div(this.config.maxUserWin, this.core.freeBets.activeFreeBet.betAmount).plus(1).toFixed(2, v.t.ROUND_DOWN) : v.t.div(this.core.config.maxUserWin, this.betControls.betAmount).toFixed(2, v.t.ROUND_DOWN)
            }
            get isActiveFreeBet() {
                return !!this.core.freeBets.activeFreeBet
            }
            soundPlayButtonClick() {
                this.sound.playSound(p.JR.ButtonClick)
            }
            soundPlayMouseOverMine() {
                this.sound.playSound(p.BU.MouseOverMine)
            }
            subscribeUpdateBetAmount() {
                this.betControls.onUpdateBetAmount$.pipe((0,
                m.t)(this)).subscribe(()=>{
                    this.updatePayout()
                }
                )
            }
        }
        ;
        C.\u0275fac = function(e) {
            return new (e || C)(t.Y36(te.y),t.Y36(Y.p),t.Y36(t.R0b),t.Y36(J.l),t.Y36(ne.a))
        }
        ,
        C.\u0275cmp = t.Xpm({
            type: C,
            selectors: [["app-mines-grid"]],
            viewQuery: function(e, n) {
                if (1 & e && t.Gf(re, 7),
                2 & e) {
                    let i;
                    t.iGM(i = t.CRH()) && (n.canvas = i.first)
                }
            },
            outputs: {
                openCell: "openCell",
                resultDrawComplete: "resultDrawComplete",
                autoplayChange: "autoplayChange"
            },
            decls: 28,
            vars: 22,
            consts: [[1, "mines-wrapper"], [1, "mines-game"], [1, "mines-header"], [1, "mines-header-info"], [1, "number-of-mines"], ["ngbDropdown", "", "placement", "bottom-left", 1, "dd"], ["ngbDropdownToggle", "", 1, "btn", "btn-game", 3, "disabled", "click"], [1, "centered-xy"], ["ngbDropdownMenu", "", 1, "shadow", "dropdown-list-number"], ["class", "py-0 text-white size-text", "ngbDropdownItem", "", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "max-win"], [1, "next-tile", "px-3", "text-dark", 3, "ngClass"], [4, "ngIf"], [1, "progress"], ["role", "progressbar", "aria-valuenow", "openCellsPercent", "aria-valuemin", "0", "aria-valuemax", "100", 1, "progress-bar", "bg-success"], [1, "row-mines"], [1, "d-block", "mx-auto"], ["canvas", ""], [1, "mines-footer", "d-flex", "align-items-center", "justify-content-center"], [1, "btn", "btn-game", 3, "disabled", "click"], ["class", "w-50 ml-1", "text", "Auto Game", 3, "disabled", "ngModel", "ngModelChange", 4, "ngIf"], ["ngbDropdownItem", "", 1, "py-0", "text-white", "size-text", 3, "ngClass", "click"], ["class", "mr-1", 4, "ngIf"], [1, "mr-1"], [4, "ngIf", "ngIfElse"], ["normalCoef", ""], ["text", "Auto Game", 1, "w-50", "ml-1", 3, "disabled", "ngModel", "ngModelChange"]],
            template: function(e, n) {
                1 & e && (t.TgZ(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "button", 6),
                t.NdJ("click", function() {
                    return n.soundPlayButtonClick()
                }),
                t.TgZ(7, "span", 7),
                t._uU(8),
                t.ALo(9, "transloco"),
                t.qZA()(),
                t.TgZ(10, "div", 8),
                t.YNc(11, le, 2, 2, "button", 9),
                t.qZA()()(),
                t._UZ(12, "app-max-win", 10),
                t.TgZ(13, "div", 11),
                t.ALo(14, "async"),
                t.YNc(15, me, 6, 6, "ng-container", 12),
                t.YNc(16, ge, 6, 5, "ng-container", 12),
                t.qZA()(),
                t.TgZ(17, "div", 13),
                t._UZ(18, "div", 14),
                t.qZA()(),
                t.TgZ(19, "div", 15),
                t._UZ(20, "canvas", 16, 17),
                t.qZA(),
                t.TgZ(22, "div", 18)(23, "button", 19),
                t.NdJ("click", function() {
                    return n.onPickRandomly()
                }),
                t.TgZ(24, "span", 7),
                t._uU(25),
                t.ALo(26, "transloco"),
                t.qZA()(),
                t.YNc(27, Ce, 1, 2, "app-game-mode-toggle", 20),
                t.qZA()()()),
                2 & e && (t.xp6(6),
                t.Q6J("disabled", !n.btnNumOfMines),
                t.xp6(2),
                t.AsE(" ", t.lcZ(9, 12, "shared.Mines"), ": ", n.minesAmount, " "),
                t.xp6(3),
                t.Q6J("ngForOf", n.numberOfMines),
                t.xp6(2),
                t.Q6J("ngClass", t.kEZ(18, fe, n.isAutoplay, !n.isAutoplay, t.lcZ(14, 14, n.maxWinService.isMaxUserWin$) && n.config.isMaxWinAm)),
                t.xp6(2),
                t.Q6J("ngIf", !n.gameConfig.coefficients),
                t.xp6(1),
                t.Q6J("ngIf", n.gameConfig.coefficients),
                t.xp6(2),
                t.Udp("width", n.openCellsPercent, "%"),
                t.xp6(5),
                t.Q6J("disabled", !n.btnRandom || n.isSelectedMaxCells),
                t.xp6(2),
                t.hij(" ", t.lcZ(26, 16, "shared.RANDOM"), " "),
                t.xp6(2),
                t.Q6J("ngIf", n.config.isAutoBetFeatureEnabled))
            },
            directives: [O.jt, O.iD, O.Vi, b.sg, O.TH, b.mk, se.y, b.O5, ie.N, B.JJ, B.On],
            pipes: [R.Ot, b.Ov, oe.P, ae.q],
            styles: ['.mines-wrapper[_ngcontent-%COMP%]{font-size:18px;height:100%;display:flex;align-items:center;justify-content:center}@media (min-width: 768px){.mines-wrapper[_ngcontent-%COMP%]:after{content:" ";position:absolute;right:-8px;top:46%;transform:translateY(-50%);width:154px;height:305px;background:url(mines-bomb.3e2ede48c255cbf9.svg)}.mines-wrapper[_ngcontent-%COMP%]:before{content:" ";position:absolute;left:-103px;top:50%;transform:translateY(-50%);width:259px;height:261px;background:url(mines-star.2a6a3218b2bd3be1.svg)}}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;justify-content:space-between;z-index:1}@media (min-width: 992px){.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]{justify-content:center}}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:space-between;align-items:center;margin-top:2px;padding:0 2px}@media (min-width: 992px){.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]{margin-top:0;margin-bottom:.3em;padding:0}}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;height:22px;background-color:#15171969;border-radius:12px;width:100%}@media (max-width: 767.98px){.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]{height:26px}}@media (max-width: 767.98px){.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .btn-game[_ngcontent-%COMP%]{height:26px}}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .max-win[_ngcontent-%COMP%]{pointer-events:none;position:absolute;display:flex;justify-content:flex-end;max-width:424.5px;width:100%;margin:0 auto;top:41px;left:50%;transform:translate(-50%)}@media (min-width: 768px){.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .max-win[_ngcontent-%COMP%]{display:none}}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .next-tile[_ngcontent-%COMP%]{height:calc(100% - 3px);border-radius:12px;font-size:12px;margin-right:2px;color:#fff;display:flex;align-items:center}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .next-tile[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:14px}@media (max-width: 767.98px){.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .next-tile[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child{font-size:12px}}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .next-tile.bg-error[_ngcontent-%COMP%]{color:#fff!important;background-color:#b32b00!important}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .number-of-mines[_ngcontent-%COMP%]{font-size:12px;color:#fff;display:flex;align-items:center}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .number-of-mines[_ngcontent-%COMP%]   .dd[_ngcontent-%COMP%]   .dropdown-menu[_ngcontent-%COMP%]{height:200px;overflow-y:auto;overflow-x:hidden}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .number-of-mines[_ngcontent-%COMP%]   .dd[_ngcontent-%COMP%]   .dropdown-item[_ngcontent-%COMP%]{width:100%}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .number-of-mines[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:140px}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .number-of-mines[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:after{position:absolute;top:5px;right:5px}@media (max-width: 767.98px){.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .mines-header-info[_ngcontent-%COMP%]   .number-of-mines[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:after{top:8px}}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-header[_ngcontent-%COMP%]   .progress[_ngcontent-%COMP%]{width:100%;background-color:#15171969;height:4px;margin-bottom:.3em;margin-top:5px}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .row-mines[_ngcontent-%COMP%]{width:100%;padding:0 5px;z-index:1;height:auto}@media (min-width: 992px){.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .row-mines[_ngcontent-%COMP%]{width:23.45em;padding:0}}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .row-mines[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]{max-height:17.85em}@media (max-width: 767.98px){.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .row-mines[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%]{max-height:16.35em;width:90%;height:auto}}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-footer[_ngcontent-%COMP%]{display:flex;width:100%;padding:2px 5px}@media (min-width: 768px){.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-footer[_ngcontent-%COMP%]{padding-top:.5em}}@media (max-width: 767.98px){.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-footer[_ngcontent-%COMP%]{margin-bottom:10px}}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-footer[_ngcontent-%COMP%]   .btn-game[_ngcontent-%COMP%]{height:1.67em;width:50%}.mines-wrapper[_ngcontent-%COMP%]   .mines-game[_ngcontent-%COMP%]   .mines-footer[_ngcontent-%COMP%]   .btn-game[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:.77em}.auto-play-toggle-wrapper[_ngcontent-%COMP%]{background-color:#15171969;border-radius:10px;height:25px;width:150px}.auto-play-toggle-wrapper[_ngcontent-%COMP%]   .auto-play-toggle[_ngcontent-%COMP%]{background-color:#f3f3f369;border-radius:10px;width:20px;height:13px}.auto-play-toggle-wrapper[_ngcontent-%COMP%]   .auto-play-toggle[_ngcontent-%COMP%]   .mark[_ngcontent-%COMP%]{width:11px;height:11px;background-color:#fff;border-radius:50%;transition:all .2s;right:9px}.auto-play-toggle-wrapper[_ngcontent-%COMP%]   .auto-play-toggle.active[_ngcontent-%COMP%]   .mark[_ngcontent-%COMP%]{right:0}.auto-play-toggle-wrapper[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{margin:0 0 0 5px;font-size:14px;color:#fff}.size-text[_ngcontent-%COMP%]{font-size:12px}']
        }),
        C = (0,
        y.gn)([(0,
        m.c)()], C);
        var be = o(9578)
          , ve = o(6064)
          , Me = o(710)
          , Oe = o(2983)
          , xe = o(4477)
          , ye = o(1911)
          , we = o(9150);
        function Pe(s, e) {
            if (1 & s) {
                const n = t.EpF();
                t.TgZ(0, "app-mines-grid", 1),
                t.NdJ("openCell", function(r) {
                    return t.CHM(n),
                    t.oxw().onOpenCell(r)
                })("resultDrawComplete", function(r) {
                    return t.CHM(n),
                    t.oxw().onResultDrawComplete(r)
                })("autoplayChange", function(r) {
                    return t.CHM(n),
                    t.oxw().onAutoplayChange(r)
                }),
                t.qZA()
            }
        }
        let f = class {
            constructor(e, n, i, r, h, u, x, E, F, k) {
                this.core = e,
                this.betControls = n,
                this.connector = i,
                this.disableBtnBetService = r,
                this.ifcApiService = h,
                this.ifcSeenderService = u,
                this.toast = x,
                this.translocoService = E,
                this.autoCashoutService = F,
                this.modalService = k,
                this.isBetAutoPlay = !1
            }
            get isMinesGame() {
                return this.core.config.activeGame === Q.R.Mines
            }
            ngOnInit() {
                !this.isMinesGame || (this.betControls.show([a.w.Autoplay, a.w.Bet]),
                this.betControls.disable([a.w.Autoplay]),
                this.core.config.showPaytableOnStart && this.modalService.open(z.$.MinesPaytable),
                this.subscribes())
            }
            subscribes() {
                this.betControls.onAction$.pipe((0,
                m.t)(this)).subscribe(e=>{
                    switch (e.name) {
                    case a.w.Bet:
                        this.makeBet();
                        break;
                    case a.w.Cashout:
                        this.makeCashout();
                        break;
                    case a.w.Autoplay:
                        this.makeAutoplayBet();
                        break;
                    case a.w.BetInput:
                        this.grid.updatePayout()
                    }
                }
                ),
                this.connector.response(P.E.Bet).pipe((0,
                m.t)(this)).subscribe(e=>{
                    if (200 !== e.code)
                        return this.autoCashoutService.stop(),
                        this.betControls.errorBetResponse(),
                        this.grid.state = l.ResetForGame,
                        void this.betControls.disable([a.w.Autoplay]);
                    this.disableBtnBetService.initDisable(),
                    this.betResponse(e)
                }
                ),
                this.connector.response(P.E.CashOut).pipe((0,
                m.t)(this)).subscribe(e=>{
                    if (200 !== e.code)
                        return this.autoCashoutService.stop(),
                        void this.betControls.enable([a.w.Cashout]);
                    this.betControls.disable([a.w.Cashout]),
                    this.grid.setResult(e)
                }
                ),
                this.connector.response(P.E.OpenCell).pipe((0,
                m.t)(this)).subscribe(e=>{
                    if (200 !== e.code)
                        return this.autoCashoutService.stop(),
                        this.grid.state = l.ResetForGame,
                        this.betControls.errorBetResponse(),
                        this.betControls.disable([a.w.Autoplay]),
                        this.betControls.hide([a.w.Cashout]),
                        this.betControls.show([a.w.Bet]),
   
