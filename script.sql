/* mysql에서 New query tab 생성하고 다른 이름으로 server 안에 저장 후 작업 시작 */

use kdt;

create table users (
	id int auto_increment primary key,
    username varchar(50) unique not null,
    password varchar(500) not null,
    name varchar(20) not null,
    email varchar(50) not null,
    url varchar(200)
);

select * from users;

create table tweets (
	id int auto_increment primary key,
    userId int not null,
    createdAt datetime default now(),
    text varchar(2000),
    foreign key(userId) references users(id)
);
select * from tweets;

drop table tweets;