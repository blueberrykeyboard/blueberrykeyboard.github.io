interface Item {
    id: number;
    isDone: boolean;
    content: string;
    date: number;
}

let mockData: Item[] = [
    {
        id: 0,
        isDone: false,
        content: 'React study',
        date: new Date().getTime(),
    },
    { id: 1, isDone: true, content: '친구만나기', date: new Date().getTime() },
    { id: 2, isDone: false, content: '낮잠자기', date: new Date().getTime() },
];

const day = ['일', '월', '화', '수', '목', '금'] as const;

window.onload = () => {
    initData(mockData);

    //현재 날짜를 년 월 일 요일로 출력한다.
    const dateSection = document.querySelector('.Header > h1');
    const date = new Date();
    dateSection!.innerHTML = `${date.getFullYear()}년 ${
        date.getMonth() + 1
    }월 ${date.getDate()}일 ${day[date.getDay()]}요일`;
};

const initData = (printData: Item[]) => {
    const todosWrapper = document.getElementsByClassName('todos_wrapper')[0];
    todosWrapper.innerHTML = '';
    printData.forEach((item) => {
        const todoItem = document.createElement('div');
        todoItem.className = 'TodoItem';
        todoItem.id = item['id'].toString();
        const date = new Date(item['date']);
        todoItem.innerHTML = `
           <input type="checkbox" onchange="onUpdate(${item['id']})" ${
            item['isDone'] ? 'checked' : '   '
        }  />
                        <div class="content">${item['content']}</div>
                        <div class="date">${date.getFullYear()}. ${
            date.getMonth() + 1
        }. ${date.getDate()} ${
            (date.getHours() - 12 >= 0 ? '오후' : '오전') +
            ' ' +
            String(date.getHours()).padStart(2, '0') +
            ':' +
            String(date.getMinutes()).padStart(2, '0') +
            ':' +
            String(date.getSeconds()).padStart(2, '0')
        }</div><button name="${
            item['id']
        }" class="button" onclick="todoDel(this)">삭제</button>
            `;

        todosWrapper.appendChild(todoItem);
    });
};
let idIndex = 3; // id의 값을 증가 시킬 변수(초기데이터가 2까지 있으므로 3부터 시작)
const button: HTMLElement = document.querySelector('.Editor > button')!;

button.onclick = () => {
    event!.preventDefault(); //전송기능 막음

    //id는 idIndex,
    //isDone은 기본 false,
    //content는 입력한 내용,
    //date는 new Date().getTime()
    const inputArea: HTMLInputElement =
        document.querySelector('.Editor > input')!;
    const data: Item = {
        id: idIndex++,
        isDone: false,
        content: inputArea.value,
        date: new Date().getTime(),
    };

    //준비된 하나의 레코드를 mokData에 push()함수를 이용해서 추가한다.
    mockData.push(data);
    initData(mockData); //호출한다.(다시 화면 랜더링)
};
const onUpdate = (targetId: number) => {
    //TodoItem에서 호출할 때 전달한 id
    /* mockData의 state의 값들 중에 targetId와 일치하는 todoitem의 isDone 변경 
       map함수를 이용한다. map함수의 결과를 mockData에 저장한다. 
    */
    mockData = mockData.map((data) => {
        if (data['id'] === targetId) {
            data['isDone'] = data['isDone'] ? false : true;
        }
        console.log(data);
        return data;
    });
    console.log(mockData);

    initData(mockData); //호출한다.(다시 화면 랜더링)
};
HTMLButtonElement;
const todoDel = (th: HTMLButtonElement) => {
    mockData = mockData.filter((data) => parseInt(th.name) !== data['id']);
    initData(mockData);
};
const keyword: HTMLElement = document.querySelector('#keyword')!;
keyword.onkeyup = (e) => {
    const keyword: HTMLInputElement = e.target! as HTMLInputElement;

    let searchedTodos = getFilterData(keyword.value);

    initData(searchedTodos);
};

const getFilterData = (search: string) => {
    //검색어가 없으면 mockData를 리턴한다.
    if (search === '') {
        return mockData;
    }

    //filter함수를 이용해서 search(검색어)를 포함하고 있는 todo들를 받는다
    return mockData.filter((data) =>
        data['content'].toUpperCase().includes(search.toUpperCase())
    );
    //filter의 결과를 리턴 한다.
};
