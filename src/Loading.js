export default function Loading({$app, initialState}) {
    this.state = initialState

    this.$target = document.createElement('div');
    this.$target.className = 'Loading Modal'
    $app.appendChild(this.$target)

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.innerHTML = `
        <div class="content">
            <img src="./assets/nyan-cat.gif">
        </div>`
        
        // state의 상태에 따라 로딩 컴포넌트를 보이기(block) or 가리기(none)
        this.$target.style.display = this.state ? 'block' : 'none';
    }
}