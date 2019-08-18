<template>
  <div class="columns" id="add-head-loss">

    <div class="column is-one-quarter" id="head-loss-duct-infos" v-if="true">
      <div class="box">
        <div class="field">
          <label class="label">Matériau</label>
          <p class="control is-expanded">
            <span class="select is-fullwidth">
              <select tabindex="-1" @input="alert('ok')">
                <option>Acier noir</option>
                <option>Acier inoxydable</option>
                <option>Polypropylène</option>
              </select>
            </span>
          </p>
        </div>

        <div class="field">
          <label class="label">Conduit</label>
          <div class="field-body">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" v-model="element._length" placeholder="Longueur">
              </p>
              <p class="control">
                <a class="button is-static">
                  mm
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="column is-one-quarter" id="head-loss-duct-infos" v-else>
      <div class="box">
        <div class="field">
          <label class="label">Conduit</label>
          <div class="field-body">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="Longueur">
              </p>
              <p class="control">
                <a class="button is-static">
                  mm
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Matériau</label>
          <p class="control is-expanded">
            <span class="select is-fullwidth">
              <select @input="alert('ok')">
                <option>Acier noir</option>
                <option>Acier inoxydable</option>
                <option>Polypropylène</option>
              </select>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="column is-one-half" id="head-loss-element-infos">
      <div class="box">
        <div class="field">
          <label class="label">Élément</label>
          <div class="field-body">
            <div class="field has-addons">
              <p class="control is-expanded">
                <span class="select is-fullwidth">
                  <select tabindex="-1" v-model="element._type">
                    <optgroup label="Réseaux">
                      <option value="major.circular">Gaine rigide circulaire</option>
                      <option value="major.rectangular">Gaine rigide rectangulaire</option>
                      <option value="major.flexible">Gaine souple</option>
                      <option value="major.pipe">Canalisation</option>
                    </optgroup>
                    <optgroup label="Accessoires">
                      <option value="minor.elbow.90">Coude 90°</option>
                      <option value="minor.elbow.45">Coude 45°</option>
                      <option value="minor.elbow.30">Coude 30°</option>
                    </optgroup>
                    <optgroup label="Equipements">
                      <option  value="minor.valve">Registre</option>
                      <option  value="minor.backflow-preventer">Clapet anti-retour</option>
                      <option  value="minor.other">Autre</option>
                    </optgroup>
                  </select>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Dimensions</label>
          <div class="field-body">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" v-model="element._diameter" placeholder="Ø ou Hauteur">
              </p>
              <p class="control">
                <a class="button is-static">
                  mm
                </a>
              </p>
            </div>
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" v-model="element._width" placeholder="Largeur">
              </p>
              <p class="control">
                <a class="button is-static">
                  mm
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {{element}}
    </div>

    <div class="column is-one-quarter" id="head-loss-fluid-infos">
      <div class="box">
        <div class="field">
          <label class="label">Fluide</label>
          <div class="field-body">
            <div class="field has-addons">
              <p class="control is-expanded">
                <span class="select is-fullwidth">
                  <select tabindex="-1" v-model="element.fluid">
                    <option value="air">Air</option>
                    <option value="water">Eau</option>
                    <option value="concrete">Béton</option>
                  </select>
                </span>
              </p>
            </div>
            <div class="field has-addons">
              <div class="control">
                <input class="input" type="text" v-model="element.temperature" placeholder="Température" tabindex="-1" style="width: 60px">
              </div>
              <div class="control">
                <a class="button is-static">
                  °C
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Débit</label>
          <div class="field-body">
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" v-model="element.flow" placeholder="Débit">
              </p>
              <p class="control">
                <span class="select">
                  <select tabindex="-1">
                    <option>m³/h</option>
                    <option>L/s</option>
                  </select>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'head-loss-form',
  data () {
    return {
      element: {
        _type: 'major.circular',
        name: null,
        points: 'A-B',
        fluid: 'air',
        temperature: 20,
        flow: null,
        _diameter: null,
        _width: null,
        _length: null,
        dzeta: null,
        rho: null,
        nu: null,
        epsilon: null
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
