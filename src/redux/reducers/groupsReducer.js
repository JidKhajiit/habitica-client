const initialState = {
    groups: [{
        title: "Some Project",
        description: "Something about this project",
        tasks: [{
            id: "task_1",
            title: 1,
            body: "test1",
            checked: false,
            workers: "user1, user2"
        }, {
            id: "task_2",
            title: 2,
            body: "test2",
            checked: false,
            workers: "user2, user8"
        }, {
            id: "task_3",
            title: 3,
            body: "test3",
            checked: false,
            workers: "user5, user2"
        }],
        users: ["user1", "user2", "user5", "user8"],
        tags: ["#job", "#project"],
        id: "group_1"
    }, {
        title: "Shopping list",
        description: "Need to buy",
        tasks: [{
            id: "task_4",
            title: 1,
            body: "test1",
            checked: false,
            workers: "user1"
        }, {
            id: "task_5",
            title: 2,
            body: "test2",
            checked: false,
            workers: "user2, user8"
        }, {
            id: "task_6",
            title: 3,
            body: "test3",
            checked: false,
            workers: "user8"
        }],
        users: ["user1", "user8"],
        tags: ["#shopping", "#family"],
        id: "group_2"
    } ],

}

export default (state = initialState, action) => {

    return state
}