import * as THREE from 'three';

export function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas')
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false
    }
  }
  
  export function handleContextLoss(renderer: THREE.WebGLRenderer) {
    renderer.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault()
      console.warn('WebGL context lost')
    }, false)
  }