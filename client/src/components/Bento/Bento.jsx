import React, { useEffect, useRef } from "react";
import "./Bento.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Matter from "matter-js";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Bento = () => {
  const containerRef = useRef();
  const box2Ref = useRef(null);
  const engineRef = useRef(Matter.Engine.create());
  const renderRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: false,
        },
      }
    );
  }, []);

  useEffect(() => {
    if (!box2Ref.current) return;

    const engine = engineRef.current;
    const { world } = engine;
    const runner = Matter.Runner.create();

    
    renderRef.current = Matter.Render.create({
      element: box2Ref.current,
      engine: engine,
      options: {
        width: box2Ref.current.clientWidth,
        height: box2Ref.current.clientHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    
    const walls = [
      Matter.Bodies.rectangle(
        box2Ref.current.clientWidth / 2,
        box2Ref.current.clientHeight,
        box2Ref.current.clientWidth,
        10,
        { isStatic: true, render: { visible: false } }
      ), 
      Matter.Bodies.rectangle(
        box2Ref.current.clientWidth / 2,
        0,
        box2Ref.current.clientWidth,
        10,
        { isStatic: true, render: { visible: false } }
      ), 
      Matter.Bodies.rectangle(
        0,
        box2Ref.current.clientHeight / 2,
        10,
        box2Ref.current.clientHeight,
        { isStatic: true, render: { visible: false } }
      ), 
      Matter.Bodies.rectangle(
        box2Ref.current.clientWidth,
        box2Ref.current.clientHeight / 2,
        10,
        box2Ref.current.clientHeight,
        { isStatic: true, render: { visible: false } }
      ),
    ];

    
    const createTextBox = (x, y, text, color, shape = "rectangle") => {
      const textWidth = text.length * 12; 
      const height = 50;

      let body;
      if (shape === "rectangle") {
        body = Matter.Bodies.rectangle(x, y, textWidth, height, {
          restitution: 0.8,
          friction: 0.3,
          chamfer: { radius: [20, 20, 20, 20] }, 
          render: { fillStyle: color },
        });
      } else if (shape === "circle") {
        body = Matter.Bodies.circle(x, y, textWidth / 2, {
          restitution: 0.8,
          friction: 0.3,
          render: { fillStyle: color },
        });
      } else if (shape === "square") {
        body = Matter.Bodies.rectangle(x, y, textWidth, textWidth, {
          restitution: 0.8,
          friction: 0.3,
          chamfer: { radius: [15, 15, 15, 15] }, 
          render: { fillStyle: color },
        });
      }

      body.customText = text;
      return body;
    };

    
    const objects = [
      createTextBox(100, 50, "Buy Me a Coffee ☕", "#931ADE"),
      createTextBox(200, 80, "Show Some Love ❤️", "#FEDE6F"),
      createTextBox(300, 110, "High Five! 🖐️", "#FF8080"),
      createTextBox(400, 140, "Level Up! 🎮", "#FEDE6F"),
      createTextBox(250, 50, "Share 📢", "#FEDE6F", "circle"),
      createTextBox(350, 50, "Tip 💵", "#FEDE6F", "square"),
    ];

    
    const mouse = Matter.Mouse.create(renderRef.current.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
      collisionFilter: { mask: 0xffffffff }, 
    });

   
    Matter.World.add(world, [...walls, ...objects, mouseConstraint]);

    
    Matter.Events.on(renderRef.current, "afterRender", function () {
      const ctx = renderRef.current.context;
      ctx.font = "18px Arial"; 
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      objects.forEach((obj) => {
        const { position, angle } = obj;

        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(angle);
        ctx.fillText(obj.customText, 0, 0);
        ctx.restore();
      });
    });

   
    Matter.Runner.run(runner, engine);
    Matter.Render.run(renderRef.current);

    return () => {
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      Matter.Render.stop(renderRef.current);
      Matter.Runner.stop(runner);
      renderRef.current.canvas.remove();
    };
  }, []);

  return (
    <div className="bento">
      <div ref={containerRef} className="container">
        <div className="left">
          <div className="rectdiv">
          <Link to="/category">
            <div className="rect1">
               
              <div className="job">
                Find a Job
                <img
                  src="right-arrow.png"
                  width={70}
                  height={70}
                  alt=""
                />
              </div>
            </div>
            </Link>
            <div className="rect2">
              <h2>Safe & Secure Payments</h2>
              <img src="pixeltrue-icons-receipt-1.svg" alt="" />
            </div>
          </div>
          <div className="sqdiv">
            <div className="box1">
              <h2>Inbox</h2>
              <img className="leaf" src="leaf.png" alt="" />
              <img  src="image-removebg-preview222.png" alt="" />
              
            </div>
            <div className="box2" ref={box2Ref}></div>{" "}
            {/* Matter.js added here */}
          </div>
        </div>
        <div className="right">
          <div className="bigbox1">
            <div className="tablets">
             <Link to="/category/design-creative">  <div className="first">Graphic Design</div></Link>
          <Link to="/category/development-it ">  <div className="second">Programmer</div></Link>
             <Link to="/category/writing-translation"> <div className="third">Content Writing</div></Link>
              <Link to="/category/video-animation">   <div className="four">Video Editing</div></Link>
             <Link to="/category"> <div className="five">more..</div></Link>
            </div>
          </div>
          <div className="bigbox2"></div>
        </div>
      </div>
    </div>
  );
};

export default Bento;
