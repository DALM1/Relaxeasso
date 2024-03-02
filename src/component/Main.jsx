import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"; // Import OrbitControls
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Import GLTFLoader

const Main = () => {
  const bookGroupRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    // Code Three.js here
    const scene = new THREE.Scene();

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    const camera = new THREE.PerspectiveCamera(
      70, // Use a smaller field of view for a top-down view
      window.innerWidth / window.innerHeight,
      0.5,
      10000
    );
    camera.position.set(4, 14, 16); // Position the camera above the scene
    camera.lookAt(0, 6, 3); // Make the camera look at the center of the scene

    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true for transparency
    renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById("skate-container");

    if (container && !container.querySelector("canvas")) {
      container.appendChild(renderer.domElement);
    }

    // Load the glTF model
    const loader = new GLTFLoader();
    loader.load(
      "skate.gltf",
      (gltf) => {
        // Once loaded, add the model to the scene
        const bookGroup = gltf.scene;
        bookGroup.scale.set(0.1, 0.1, 0.1); // Reduce the size of the object by 70%
        
        // Load textures
        const textureLoader = new THREE.TextureLoader();
        const textures = [];
        for (let i = 0; i <= 4; i++) {
          textures.push(textureLoader.load(`./assets/texture${i}.png`));
        }
        
        
        // Apply textures to different parts of the model
        bookGroup.traverse((child, index) => {
          if (child.isMesh && index < textures.length) {
            child.material.map = textures[index];
          }
        });
        
        scene.add(bookGroup);
        bookGroupRef.current = bookGroup; // Set the reference to the loaded object
      },
      undefined,
      (error) => {
        console.error("Error loading glTF model:", error);
      }
    );

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = false;
    controls.enablePan = false;

    // Event listener for scroll
    const handleScroll = () => {
      if (!bookGroupRef.current) return;

      const rotationSpeed = 0.015; // Adjust rotation speed as needed
      bookGroupRef.current.rotation.y += rotationSpeed;
      bookGroupRef.current.rotation.z += rotationSpeed;
    };

    document.addEventListener("scroll", handleScroll);

    const animate = () => {
      if (!mounted) return;

      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mounted = false;
      document.removeEventListener("scroll", handleScroll);
      if (container && container.querySelector("canvas")) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div id="container">
      <div id="skate-container" className="canvas-container"></div>
      
    </div>
  );
};

export default Main;
