export default function Breadcrumb({$app, initialState, onClick}) {
    // state == 파일 이동경로 (depth )
    this.state = initialState
    this.onClick = onClick

    this.$target = document.createElement('nav')
    this.$target.className = 'Breadcrumb'
    $app.appendChild(this.$target)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        this.$target.innerHTML = `<div class="nav-item">root</div>${
            this.state.map(
                (node, index) => `<div class="nav-item" data-index="${index}">${node.name}</div>`).join('')}`
    }

    this.$target.addEventListener("click", (e) => {
        // 이벤트 위임
        const $navItem = e.target.closest('.nav-item')

        if ($navItem) {
            const {index} = $navItem.dataset
            this.onClick(index? parseInt(index, 10) : null)
        }
    })

    this.render()
}