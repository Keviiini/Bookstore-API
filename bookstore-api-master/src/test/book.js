import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiNock from 'chai-nock';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import nock from 'nock';
import Book from '../models/book';

import server from '../server';
import resetDatabase from '../utils/resetDatabase';

chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier
describe('Premiere serie de test (Empty Database)', () => {
    //     //     // Empty object

    //     //     // Clean database
    beforeEach(() => {
        resetDatabase();
    });

    it('should have get books', done => {
        chai
            .request(server)
            .get('/book')
            .end((err, res) => {
                expect(res.body).to.have.a('object');
                expect(res).to.have.status(200);
                expect(res.body.books).to.have.a('array');
                expect(res.body.books).to.be.an('array').that.is.empty; // Empty
                expect(res.body.books.length).to.equal(0); // Lenght
                done();
            });
    });

    it('should have create book', done => {
        chai
            .request(server)
            .post('/book')
            .send({
                'title': 'Avengers - End game',
                'years': '2019',
                'pages': '3524'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal('book successfully added');
                done();
            });
    });
});

describe('Seconde serie de test (Mocked Database)', () => {

    // Clean database and a book
    beforeEach(() => {
        resetDatabase();
    });


    // if (initialStructure) {

    //     let obj = new books(initialStructure);
    //     obj.save((err) => {
    //         if (err) {
    //             console.log('merde')
    //             console.log(err);
    //         } else {
    //             console.log('ok')
    //         }
    //     });
    // }

    it('should update a book', done => {
        let book = new Book({
            ref: "2db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a2",
            title: 'Coco raconte Channel 2',
            years: 1990,
            pages: 400
        });
        book.save((err, data) => {
            chai
                .request(server)
                .put(`/book/${data.ref}`)
                .set('content-type', 'application/json')
                .send({
                    "title": "Avengers - Start game 2324242"
                })
                .end((err, res) => {
                    if (err) console.log(err);
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.be.equal('book successfully updated');
                    done();
                });
        });
    });

    it('should have delete a book', done => {
        let book = new Book({
            ref: "2db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a2",
            title: 'Coco raconte Channel 2',
            years: 1990,
            pages: 400
        });
        book.save((err, data) => {
            chai
                .request(server)
                .delete('/book/2db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a2')
                .end((err, res) => {
                    if (err) console.log(err);
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.be.equal('book successfully deleted');
                    done();
                });
        });
    });



    it('should have get a book', done => {
        let book = new Book({
            ref: "2db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a2",
            title: 'Coco raconte Channel 2',
            years: 1990,
            pages: 400
        });
        book.save((err, data) => {
            chai
                .request(server)
                .get('/book/2db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a2')
                .end((err, res) => {
                    if (err) console.log(err);
                    expect(res.body.message).to.be.equal('book fetched');
                    expect(res.body.book).to.have.a('object');
                    expect(res.body.book.title).to.be.a('string');
                    expect(res.body.book.title).to.be.equal('Coco raconte Channel 2');
                    expect(res.body.book.years).to.be.a('number');
                    expect(res.body.book.years).to.equal(1990);
                    expect(res.body.book.pages).to.be.a('number');
                    expect(res.body.book.pages).to.be.equal(400);
                    done();
                });
        });
    });
});
// Test unitaire 
// Empty object
const database = {
    books: []
}

//  object
const databaseUn = {
    books:
        [{"id":"100","title":"Coco raconte Channel 2","years":1990,"pages":400},
                {"id":"200","title":"coco na channel","years":"2000","pages":"300"},
                {'id':"300","title":"coco et oui oui ","years":"195","pages":"250"}]

}

describe('Bat Test 1', function() {

    // Clean database
beforeEach(() => {
    resetDatabase(path.normalize(`${__dirname}/../data/books.json`), database);
});

    it('Message connnexion', done => {
        chai.request(server)
        .get('/')
        .end(function (err, res) {
            console.log(" ========== >"+err);
            console.log(" ========== >"+res.body.message);
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Welcome to our Bookstore!");
        done();
        });
    })

        it('Table Json', done => {
            chai.request(server)
            .get('/book')
            .end(function (err, res) {
            console.log(" ========== >"+err);
            console.log(" ========== >"+res.body.message);
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
            });
        })


        it('insert', done => {
            chai.request(server)
            .post('/book')
            .type('form')
            .send({
            'title': '123',
            'years': '2000',
            'pages': '455'
            })
            .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal("book successfully added");
            done();
            });
        })

});
describe('Bat Test 2', function() {


    // Clean database
beforeEach(() => {
    resetDatabase(path.normalize(`${__dirname}/../data/books.json`), databaseUn);
});


    it('Détails book', done => {
        chai.request(server)
        .get('/book/100')
        .end((err, res) => {
            if(err) {
                 console.log(" ========== >"+res.body.message);
            }
            // console.log(" ========== >"+err);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
        });
    })



    it('delete', done => {
        chai.request(server)
        .delete('/book/100')
        .end(function (err, res) {
            // console.log(" ========== >"+err);
            console.log(" ========== >"+res.body.message);
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("book successfully deleted");
        done();
        });
    })



    it('update', done => {
        chai.request(server)
        .put('/book/100')
        .send({ title: 'Paris nord', page: '300' })
        .end(function (err, res) {
            // console.log(" ========== >"+err);
            console.log(" ========== >"+res.body.message);
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("book successfully updated");
        done();
        });
    })

});