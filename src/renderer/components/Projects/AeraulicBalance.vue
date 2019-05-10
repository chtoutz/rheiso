<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <div v-show="selectedRoom">
        <div id="drawing-zone"></div>
      </div>
    </div>
    <div class="column" v-if="!selectedNone">
      <div class="tabs is-boxed">
        <ul>
          <li :class="{'is-active': roomProp === 'synthesis'}">
            <a @click="roomProps('synthesis')">
              <span class="icon has-text-grey"><i class="fa fa-dashboard" aria-hidden="true"></i></span>
              <span>Synthèse</span>
            </a>
          </li>
          <li :class="{'is-active': roomProp === 'caracteristics'}">
            <a @click="roomProps('caracteristics')">
              <span class="icon has-text-grey"><i class="fa fa-building-o" aria-hidden="true"></i></span>
              <span>Caractéristiques</span>
            </a>
          </li>
          <li :class="{'is-active': roomProp === 'walls'}">
            <a @click="roomProps('walls')">
              <span class="icon has-text-grey"><i class="fa fa-music" aria-hidden="true"></i></span>
              <span>Parois</span>
            </a>
          </li>
          <li :class="{'is-active': roomProp === 'air-supply'}">
            <a @click="roomProps('air-supply')">
              <span class="icon has-text-success"><i class="fa fa-arrow-down" aria-hidden="true"></i></span>
              <span>Flux entrants</span>
            </a>
          </li>
          <li :class="{'is-active': roomProp === 'air-return'}">
            <a @click="roomProps('air-return')">
              <span class="icon has-text-primary"><i class="fa fa-arrow-up" aria-hidden="true"></i></span>
              <span>Flux sortants</span>
            </a>
          </li>
          <li :class="{'is-active': roomProp === 'heat-balance'}">
            <a @click="roomProps('heat-balance')">
              <span class="icon has-text-danger"><i class="fa fa-sun-o" aria-hidden="true"></i></span>
              <span>Bilan été</span>
            </a>
          </li>
          <li :class="{'is-active': roomProp === 'cool-balance'}">
            <a @click="roomProps('cool-balance')">
              <span class="icon has-text-info"><i class="fa fa-snowflake-o" aria-hidden="true"></i></span>
              <span>Bilan hiver</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- <div class="cotent"> -->
      <article class="" v-if="roomProp === 'synthesis' || roomProp === 'caracteristics'">
        <h2>Caractéristiques</h2>
        <!-- Main container -->
        <nav class="level">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>123</strong> posts
              </p>
            </div>
            <div class="level-item">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Find a post">
                </p>
                <p class="control">
                  <button class="button">
                    Search
                  </button>
                </p>
              </div>
            </div>
          </div>

          <!-- Right side -->
          <!-- <div class="level-right">
            <p class="level-item"><strong>All</strong></p>
            <p class="level-item"><a>Published</a></p>
            <p class="level-item"><a>Drafts</a></p>
            <p class="level-item"><a>Deleted</a></p>
            <p class="level-item"><a class="button is-success">New</a></p>
          </div> -->
        </nav>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Longueur</label>
              <div class="control">
                <input class="input is-small" type="text" :placeholder="selectedMany ? '* Varie *' : 'Longueur du local'" v-model="selectedRoom._length">
              </div>
            </div>
            <div class="field">
              <label class="label">Largeur</label>
              <div class="control">
                <input class="input is-small" type="text"  :placeholder="selectedMany ? '* Varie *' : 'Largeur du local'" v-model="selectedRoom._width">
              </div>
            </div>
            <div class="field">
              <label class="label">Hauteur</label>
              <div class="control">
                <input class="input is-small" type="text"  :placeholder="selectedMany ? '* Varie *' : 'Hauteur du local'" v-model="selectedRoom._height">
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Surface</label>
              <div class="control">
                <input class="input is-small is-static" type="text" placeholder="Text input" value="dede" readonly>
              </div>
            </div>
            <div class="field">
              <label class="label">Volume</label>
              <div class="control">
                <input class="input is-small" type="text" placeholder="Text input" value="bulma">
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left has-icons-right">
            <input class="input is-success" type="text" placeholder="Text input" value="bulma">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </div>
          <p class="help is-success">This username is available</p>
        </div>

        <div class="field">
          <label class="label">Subject</label>
          <div class="control">
            <div class="select">
              <select>
                <option>Select dropdown</option>
                <option>With options</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Message</label>
          <div class="control">
            <textarea class="textarea" placeholder="Textarea"></textarea>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox">
              I agree to the <a href="#">terms and conditions</a>
            </label>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="radio">
              <input type="radio" name="question">
              Yes
            </label>
            <label class="radio">
              <input type="radio" name="question">
              No
            </label>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link">Submit</button>
          </div>
          <div class="control">
            <button class="button is-text">Cancel</button>
          </div>
        </div>
      </article>
      <!-- Show only if a unique room is selected -->
      <p v-if="selectedRoom">
        <strong>#{{ selectedRoom._number }} - {{ selectedRoom._name }}</strong> <small>Edité le <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time></small>
        <br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
      </p>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'aeraulic-balance'
}
</script>

<style lang="css">
</style>
