import React from 'react';

        const styles = {
            h1: {
                color: '#00A6FB',
                fontFamily: '',
                padding: '50px',
                textAlign: 'center',
            },
            container: {
                padding: '10px',
                display: 'flex',
                border: '5px solid #00A6FB)',
                boxShadow: '5px 10px 10px #00A6FB',
                height: 'fit-content',
                background: '#051923'
            },
            content: {
            },
            img: {
              width: '50%'
            },
            p: {
              color: '#00A6FB',
            },
            main: {
              background: "#006494",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }
        };
        
        export default function About() {
          return (
            <main style={styles.main}>
              <div className="container" style={styles.container}>
                <div style={styles.content}>
                <h1 className='font-link' style={styles.h1}>About Us</h1>
                <p style={styles.p}>
                  This site is a startup! Originally made for educational purposes. The team constists of three Full Stack Web Developers looking to find a place in the world. If you like the site, be sure to checkout the developers down below!
                </p>
                </div>
                </div>
            </main>
          );
        };