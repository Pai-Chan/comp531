import { expect } from 'chai'
import particle, { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // IMPLEMENT ME:
        //   check position, velocity, acceleration, mass
        //   these should all be numbers or arrays of numbers
        expect(p.position).to.be.instanceof(Array)
        for (var i = 0; i < p.position.length; i++) {
            expect(p.position[i]).to.be.a("number")
        }
        expect(p.velocity).to.be.instanceof(Array)
        for (var i = 0; i < p.velocity.length; i++) {
            expect(p.velocity[i]).to.be.a("number")
        }
        expect(p.acceleration).to.be.instanceof(Array)
        for (var i = 0; i < p.acceleration; i++) {
            expect(p.acceleration).to.be.a("number")
        }
        expect(p.mass).to.be.a("number")
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        expect(position).to.eql([1.5, 0.5])
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        expect(position).to.eql([2.0, 0.0])
    })

    it('should update the velocity by the acceleration', () => {
        // IMPLEMENT ME:
        //    similar to the previous check
        //    check that the velocity is updated correctly
        const p = particle({position: [1, 1], velocity: [0.5, -0.5], acceleration: [1, 1]})
        const { velocity } = update(p, 1.0)
        expect(velocity).to.eql([1.5, 0.5])
    })

    it('particles should wrap around the world', () => {
        // IMPLEMENT ME:
        
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides

        // you will want to send the canvas into the update function
        // this means you decide the size of the canvas here.
        // canvas = { width, height }
        const p = particle({position: [-10, -20], velocity: [-0.5, -0.5], acceleration: [-1, -1]})
        const { position } = update(p, 1.0)
        for (var i = 0; i < p.position; i++) {
            expect(p.position[i]).to.be.within(0, 800)
        }
    })

})
