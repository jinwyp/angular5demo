/**
 * Created by jin on 8/16/17.
 */


import {MaxPipe} from './max.pipe'

describe('MaxPipe', () => {
    let pipe: MaxPipe
    const testString: string = 'test'

    beforeEach(() => pipe = new MaxPipe())

    it('Less then allowed', () => expect(pipe.transform(testString, testString.length + 1)).toEqual(testString))
    it('Equal to allowed', () => expect(pipe.transform(testString, testString.length)).toEqual(testString))
    it('More then allowed', () => expect(pipe.transform(testString, testString.length - 1)).toEqual(testString.slice(0, -1)))
})
