import React, {useEffect} from 'react';
import TestRenderer from 'react-test-renderer';
//import ShallowRenderer from 'react-test-renderer/shallow';
import {StoresProvider, useStore} from '../src';
import {MyStore} from './helpers/MyStore';
import {TestApp} from './helpers/components';
import flushPromises from './helpers/flushPromises';

/**
 * In order for this test suite to run, you must npm link this repository to a React dependency
 * elsewhere.
 *
 * EX: npm link ../test-app/node_modules/react
 */

describe('<StoresProvider />', () => {
  describe('tests that the component will mount successfully with all arguments', () => {
    it('should mount successfully without crashing', () => {
      const myStore = new MyStore();
      const tree = TestRenderer.create(
        <StoresProvider stores={myStore}>
          <p>Testing</p>
        </StoresProvider>
      );
      expect(tree).toBeTruthy();
    });
  });

  // describe('tests the reducer argument passed into the <StoresProvider /> component', () => {
  //   /**
  //    * Rids console.error in tests from PropTypes where we're specifically trying to test if
  //    * custom error messages occur when passing certain props.
  //    *  */
  //
  //   beforeEach(() => {
  //     console.error = jest.fn();
  //   });
  //
  //   const errorMessage =
  //     'The reducer must be a function. You might have forgotten to pass your reducer into your StoresProvider.';
  //
  //   it('should throw an error when no reducer is passed into it', () => {
  //     const renderer = new ShallowRenderer();
  //     expect(() => {
  //       return renderer.render(
  //         <StoresProvider stateContext={testContext}>
  //           <p>Testing</p>
  //         </StoresProvider>
  //       );
  //     }).toThrow(errorMessage);
  //   });
  //
  //   it('should throw an error when an object is passed in as a reducer', () => {
  //     const renderer = new ShallowRenderer();
  //     expect(() => {
  //       return renderer.render(
  //         <StoresProvider reducer={{}} stateContext={testContext}>
  //           <p>Testing</p>
  //         </StoresProvider>
  //       );
  //     }).toThrow(errorMessage);
  //   });
  //
  //   it('should throw an error when an array is passed in as a reducer', () => {
  //     const renderer = new ShallowRenderer();
  //     expect(() => {
  //       return renderer.render(
  //         <StoresProvider reducer={[]} stateContext={testContext}>
  //           <p>Testing</p>
  //         </StoresProvider>
  //       );
  //     }).toThrow(errorMessage);
  //   });
  //
  //   it('should throw an error when a string is passed in as a reducer', () => {
  //     const renderer = new ShallowRenderer();
  //     expect(() => {
  //       return renderer.render(
  //         <StoresProvider reducer="Dude" stateContext={testContext}>
  //           <p>Testing</p>
  //         </StoresProvider>
  //       );
  //     }).toThrow(errorMessage);
  //   });
  // });
  //
  // describe('tests the children argument passed into the <StoresProvider /> component', () => {
  //   beforeEach(() => {
  //     console.error = jest.fn();
  //   });
  //
  //   const errorMessage =
  //     'StoresProvider must contain children components. You probably forgot to wrap it around your components in your JSX.';
  //
  //   it('should throw an error when no children are passed into it', () => {
  //     const renderer = new ShallowRenderer();
  //     expect(() => {
  //       return renderer.render(
  //         <StoresProvider reducer={testReducer} stateContext={testContext} />
  //       );
  //     }).toThrow(errorMessage);
  //   });
  //
  //   it('should throw an error when children are not of type "object"', () => {
  //     const renderer = new ShallowRenderer();
  //     expect(() => {
  //       return renderer.render(
  //         <StoresProvider reducer={testReducer} stateContext={testContext}>
  //           {'Marty, we have to go back!'}
  //         </StoresProvider>
  //       );
  //     }).toThrow(errorMessage);
  //   });
  //
  //   it('should throw an error when children are an empty object', () => {
  //     const renderer = new ShallowRenderer();
  //     expect(() => {
  //       return renderer.render(
  //         <StoresProvider reducer={testReducer} stateContext={testContext}>
  //           {}
  //         </StoresProvider>
  //       );
  //     }).toThrow(errorMessage);
  //   });
  // });

  describe('.useStore()', () => {
    describe('tests that .useStateValue() will destructure state and dispatch', () => {
      it('should mount successfully and destructure state and dispatch without crashing', () => {
        const ChildComponent = () => {
          const [{text}, store] = useStore();

          return <p>{text}</p>;
        };

        const tree = TestRenderer.create(
          <TestApp>
            <ChildComponent />
          </TestApp>
        ).toJSON();

        expect(tree.children[0].children[0]).toBe('Testing');
      });

      it('should successfully dispatch', done => {
        const newText = 'Testing Dispatch';
        const ChildComponent = () => {
          const [{text}, store] = useStore();
          useEffect(() => store.updateText(newText));
          return <p>{text}</p>;
        };

        const tree = TestRenderer.create(
          <TestApp>
            <ChildComponent />
          </TestApp>
        ).toJSON();
        flushPromises().then(() => {
          expect(tree.children[0].children[0]).toBe(newText);
          done();
        });
      });
    });
    //
    //   describe('tests that not passing context to .useStateValue() throws an error', () => {
    //     beforeEach(() => {
    //       console.error = jest.fn();
    //     });
    //
    //     it('should throw an error when no context is passed into it', () => {
    //       const ChildComponent = () => {
    //         const [{ text }] = useStateValue();
    //         return <p>{text}</p>;
    //       };
    //
    //       expect(() => {
    //         return TestRenderer.create(
    //           <TestApp>
    //             <ChildComponent />
    //           </TestApp>
    //         );
    //       }).toThrow(
    //         'The stateContext object is undefined in your useStateValue hook. You probably forgot to pass the stateContext object into your useStateValue hook.'
    //       );
    //     });
    //   });
    //
    //   describe('tests that primitive data types, arrays, and objects passed as argument throws an error', () => {
    //     beforeEach(() => {
    //       console.error = jest.fn();
    //     });
    //
    //     const errorMessage =
    //       'Incorrect argument passed to the useStateValue hook. You probably passed a variable other than your context object into it.';
    //
    //     it('should throw an error when an object literal is passed into it', () => {
    //       const ChildComponent = () => {
    //         const [{ text }, dispatch] = useStateValue({ text: 'Testing' });
    //         return <p>{text}</p>;
    //       };
    //
    //       expect(() => {
    //         return TestRenderer.create(
    //           <TestApp>
    //             <ChildComponent />
    //           </TestApp>
    //         );
    //       }).toThrow(errorMessage);
    //     });
    //
    //     it('should throw an error when an array literal is passed into it', () => {
    //       const ChildComponent = () => {
    //         const [{ text }, dispatch] = useStateValue(['Testing']);
    //         return <p>{text}</p>;
    //       };
    //
    //       expect(() => {
    //         return TestRenderer.create(
    //           <TestApp>
    //             <ChildComponent />
    //           </TestApp>
    //         );
    //       }).toThrow(errorMessage);
    //     });
    //
    //     it('should thrown an error when a string literal is passed into it', () => {
    //       const ChildComponent = () => {
    //         const [{ text }, dispatch] = useStateValue('Testing');
    //         return <p>{text}</p>;
    //       };
    //
    //       expect(() => {
    //         return TestRenderer.create(
    //           <TestApp>
    //             <ChildComponent />
    //           </TestApp>
    //         );
    //       }).toThrow(errorMessage);
    //     });
    //   });
    //
    //   describe('tests that the wrong context passed into .useStateValue() throws an error', () => {
    //     beforeEach(() => {
    //       console.error = jest.fn();
    //     });
    //
    //     it('should throw an error when the wrong context object is passed into it', () => {
    //       const ChildComponent = () => {
    //         const [{ text }, dispatch] = useStateValue(wrongContext);
    //         return <p>{text}</p>;
    //       };
    //
    //       expect(() => {
    //         return TestRenderer.create(
    //           <TestApp>
    //             <ChildComponent />
    //           </TestApp>
    //         );
    //       }).toThrow(
    //         'The useStateValue hook must be used within the Provider of the Context object you have passed to it. Check to make sure you have passed in the correct context object and that the useStateValue hook is within a child of the correct Provider.'
    //       );
    //     });
    //   });
  });
});
