import { List, fromJS } from 'immutable';

export const guilds = List(
    fromJS([
        {
            id: 1337,
            name: 'founding fathers',
            size: 4,
        },
        {
            id: 1,
            name: 'GET',
            size: 7,
        },
        {
            id: 2,
            name: 'Kontoret',
            size: 6,
        },
        {
            id: 3,
            name: 'Amedia',
            size: 4,
        },
    ]),
);

export const highscore = List(
    fromJS([
        {
            name: 'Truls',
            highscore: 1337,
            userid: 1,
            image: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c247.37.466.466/s200x200/481116_10150942288436755_577856798_n.jpg?oh=78e108e835b5d06d70b89c1b0b54dd96&oe=598F7018',
        },
        {
            name: 'Truls',
            highscore: 1337,
            userid: 2,
            image: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c247.37.466.466/s200x200/481116_10150942288436755_577856798_n.jpg?oh=78e108e835b5d06d70b89c1b0b54dd96&oe=598F7018',
        },
        {
            name: 'Truls',
            highscore: 1337,
            userid: 3,
            image: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c247.37.466.466/s200x200/481116_10150942288436755_577856798_n.jpg?oh=78e108e835b5d06d70b89c1b0b54dd96&oe=598F7018',
        },
        {
            name: 'Truls',
            highscore: 1337,
            userid: 4,
            image: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c247.37.466.466/s200x200/481116_10150942288436755_577856798_n.jpg?oh=78e108e835b5d06d70b89c1b0b54dd96&oe=598F7018',
        },
        {
            name: 'Truls',
            highscore: 1337,
            userid: 5,
            image: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c247.37.466.466/s200x200/481116_10150942288436755_577856798_n.jpg?oh=78e108e835b5d06d70b89c1b0b54dd96&oe=598F7018',
        },
        {
            name: 'Truls',
            highscore: 1337,
            userid: 6,
            image: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c247.37.466.466/s200x200/481116_10150942288436755_577856798_n.jpg?oh=78e108e835b5d06d70b89c1b0b54dd96&oe=598F7018',
        },
    ]),
);
