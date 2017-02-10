/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { Letter } from './../../domain/letter';

import { MailBoxLettersFilterPipe } from './mail-box-letters-filter.pipe';

let letters: Letter[] = [
  new Letter('Verify email please', 'Please visit this link', 'a@asdf.ru', '1', '1'),
  new Letter('Monthly meeting', 'We are waiting you', 'asdf@asdf.ru', '1', '2'),
  new Letter('Please responce', 'We are need you answer', 'asdf@asdf.ru', '1', '3'),
  new Letter('Test message', 'Test', 'asdf@asdf.ru', '1', '4'),
  new Letter('Re: test message', 'Test for you', 'asdf@asdf.ru', '1', '5')
];

describe('MailBoxLettersFilterPipe', () => {
  it('create an instance', () => {
    let pipe = new MailBoxLettersFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('Can filter by subject', () => {
    let pipe = new MailBoxLettersFilterPipe();

    let result = pipe.transform(letters, 'please');

    expect(result.length).toEqual(2);
    expect(result[0]._id).toEqual('1');
    expect(result[1]._id).toEqual('3');
  });

  it('Can filter by body', () => {
    let pipe = new MailBoxLettersFilterPipe();

    let result = pipe.transform(letters, 'YOU');

    expect(result.length).toEqual(3);
    expect(result[0]._id).toEqual('2');
    expect(result[1]._id).toEqual('3');
    expect(result[2]._id).toEqual('5');
  });

  it('Can filter by email', () => {
    let pipe = new MailBoxLettersFilterPipe();

    let result = pipe.transform(letters, 'asdf@asdf.ru');

    expect(result.length).toEqual(4);
    expect(result[0]._id).toEqual('2');
    expect(result[1]._id).toEqual('3');
    expect(result[2]._id).toEqual('4');
    expect(result[3]._id).toEqual('5');
  });
  
});
