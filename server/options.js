const baseOptions = {
    getDate: (container) => {
        return new Date(container.parent.parent.parent.children[1].children[0].data.trim());
    },
    getHomeTeam: (container) => {
        const element = container.children[1];
        return element.children[0].data.trim();
    },
    getAwayTeam: (container) => {
        const element = container.children[1];
        return element.children[2].data.trim();
    },
    getMathGoals: (container) => {

        const element = container.children[3];

        let goals = element.children.filter(tag => tag.name === 'font').map(tag => {

            let goal = tag.children[0].data.trim();
            let goalerAndMinute = tag.children[1].children[0].data.trim();
            let minute = Number(/(\d+)/gi.exec(goalerAndMinute)[1]);
            return { score: goal, minute }

        })

        let htGoals = 0;

        goals = goals.map((item) => {
            let htCurGoals = +/^\d+/.exec(item.score)[0];
            let atCurGoals = +/\d+$/.exec(item.score)[0];
            let scorer = 'at'

            if (htGoals < htCurGoals) {
                htGoals++
                scorer = 'ht'
            }

            return {
                score: item.score,
                minute: item.minute,
                htGoals: htCurGoals,
                atGoals: atCurGoals,
                scorer
            }
        })

        return goals

    }
}

const options_2018 = Object.create(baseOptions);

const options_2017 = Object.create(baseOptions);

options_2017.getHomeTeam = function (container) {
    const element = container.children[1].children[1].children[0].children[0].children[0].children[1].children[0];
    return element.children[0].data.trim()
}
options_2017.getAwayTeam = function (container) {
    const element = container.children[1].children[1].children[0].children[2].children[0].children[1].children[0];
    return element.children[0].data.trim()
}

const options_2016 = Object.create(baseOptions);
options_2016.getHomeTeam = function (container) {
    const element = container.children[1].children[1].children[1].children[0].data.trim();
    return element
}
options_2016.getAwayTeam = function (container) {
    const element = container.children[1].children[1].children[5].children[0].data.trim();
    return element
}
options_2016.getMathGoals = function (container) {

    const element = container.children[1];

    let goals = element.children.filter(tag => tag.name === 'font').map(tag => {

        let goal = tag.children[0].data.trim();
        let goalerAndMinute = tag.children[1].children[0].data.trim();
        let minute = Number(/(\d+)/gi.exec(goalerAndMinute)[1]);
        return { score: goal, minute }

    })


    let htGoals = 0;

    goals = goals.map((item) => {
        let htCurGoals = +/^\d+/.exec(item.score)[0];
        let atCurGoals = +/\d+$/.exec(item.score)[0];
        let scorer = 'at'

        if (htGoals < htCurGoals) {
            htGoals++;
            scorer = 'ht'
        }

        return {
            score: item.score, 
            minute: item.minute, 
            htGoals: htCurGoals, 
            atGoals: atCurGoals, 
            scorer
        }
    })

    return goals

}


const options_2015 = Object.create(options_2016);

const options_2014 = Object.create(options_2016);

const options_2013 = Object.create(options_2016)


const options_col = {
    options_2018,
    options_2017,
    options_2016,
    options_2015,
    options_2014,
    options_2013
}


module.exports = options_col